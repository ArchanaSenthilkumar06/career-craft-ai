import { Router, Request, Response } from 'express';
import { dbStatus } from '../config/db';
import { AppStateModel } from '../models';
import { geminiService } from '../services/geminiService';

export const apiRouter = Router();

const isValidWorkspaceId = (value: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

const isAppState = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const state = value as Record<string, unknown>;
  return (
    state.version === 1 &&
    typeof state.currentPathway === 'string' &&
    typeof state.user === 'object' &&
    state.user !== null &&
    typeof state.activeTab === 'string' &&
    typeof state.isDarkMode === 'boolean' &&
    Array.isArray(state.records) &&
    typeof state.resume === 'object' &&
    state.resume !== null &&
    Array.isArray(state.quests)
  );
};

// Health Check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'CareercraftAI',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.isConnected,
      host: dbStatus.host || null,
      name: dbStatus.databaseName || null,
      message: dbStatus.error || 'Connected'
    },
    ai: {
      configured: geminiService.isConfigured(),
      model: geminiService.getModelName()
    }
  });
});

// Load a browser workspace's persisted app data
apiRouter.get('/state/:workspaceId', async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  if (!isValidWorkspaceId(workspaceId)) {
    return res.status(400).json({ error: 'A valid workspace ID is required' });
  }
  if (!dbStatus.isConnected) {
    return res.status(503).json({ error: 'MongoDB is not connected; app data cannot be loaded' });
  }

  try {
    const document = await AppStateModel.findOne({ workspaceId }).select('state -_id').lean();
    return res.json({ state: document?.state ?? null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[CareercraftAI API] Failed to load app state: ${message}`);
    return res.status(500).json({ error: 'Failed to load app data from MongoDB' });
  }
});

// Save a browser workspace's app data
apiRouter.put('/state/:workspaceId', async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  if (!isValidWorkspaceId(workspaceId)) {
    return res.status(400).json({ error: 'A valid workspace ID is required' });
  }
  if (!isAppState(req.body?.state)) {
    return res.status(400).json({ error: 'A valid app state is required' });
  }
  if (!dbStatus.isConnected) {
    return res.status(503).json({ error: 'MongoDB is not connected; app data cannot be saved' });
  }

  try {
    const document = await AppStateModel.findOneAndUpdate(
      { workspaceId },
      { $set: { state: req.body.state } },
      { new: true, upsert: true, runValidators: true }
    )
      .select('updatedAt -_id')
      .lean();
    return res.json({ saved: true, updatedAt: document?.updatedAt });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[CareercraftAI API] Failed to save app state: ${message}`);
    return res.status(500).json({ error: 'Failed to save app data to MongoDB' });
  }
});

// Performance Analysis
apiRouter.post('/performance/analyze', (req: Request, res: Response) => {
  const { records } = req.body;
  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ error: 'records array is required' });
  }

  // Calculate metrics deterministically
  let totalObtained = 0;
  let totalMax = 0;
  const subjectMap = new Map<string, { total: number; max: number; count: number }>();

  records.forEach((r: any) => {
    const max = Number(r.maxMarks) || 100;
    const obtained = Number(r.marksObtained) || 0;
    totalObtained += obtained;
    totalMax += max;

    const s = r.subject || 'General';
    if (!subjectMap.has(s)) {
      subjectMap.set(s, { total: 0, max: 0, count: 0 });
    }
    const cur = subjectMap.get(s)!;
    cur.total += obtained;
    cur.max += max;
    cur.count += 1;
  });

  const overallAvg = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100 * 10) / 10 : 0;
  const breakdown = Array.from(subjectMap.entries()).map(([subject, data]) => ({
    subject,
    average: data.max > 0 ? Math.round((data.total / data.max) * 100 * 10) / 10 : 0,
    count: data.count
  }));

  res.json({
    overallAverage: overallAvg,
    assessmentCount: records.length,
    subjectBreakdown: breakdown,
    evaluatedAt: new Date().toISOString()
  });
});

// AI Learning Mentor endpoint
apiRouter.post('/learning/mentor', async (req: Request, res: Response) => {
  const { query, topic, difficulty, personality, availableTimeMinutes } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'query parameter is required' });
  }

  try {
    if (!geminiService.isConfigured()) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server. Falling back to built-in curriculum.'
      });
    }

    const result = await geminiService.generateMentorExplanation({
      query,
      topic: topic || 'General Learning',
      difficulty: difficulty || 'intermediate',
      personality: personality || 'study_buddy',
      availableTimeMinutes: Number(availableTimeMinutes) || 15
    });

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error communicating with AI service' });
  }
});

// AI Quiz Generation endpoint
apiRouter.post('/learning/quiz', async (req: Request, res: Response) => {
  const { topic, difficulty } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'topic is required' });
  }

  try {
    if (!geminiService.isConfigured()) {
      return res.status(503).json({ error: 'AI service not configured for dynamic quiz generation.' });
    }
    const questions = await geminiService.generateQuiz(topic, difficulty || 'intermediate');
    res.json({ questions });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate quiz questions' });
  }
});

// Resume Suggestion Decision
apiRouter.post('/resumes/suggestions/:id/decision', (req: Request, res: Response) => {
  const { id } = req.params;
  const { decision } = req.body; // 'accepted' | 'rejected'

  if (!['accepted', 'rejected'].includes(decision)) {
    return res.status(400).json({ error: 'decision must be accepted or rejected' });
  }

  res.json({
    suggestionId: id,
    status: decision,
    updatedAt: new Date().toISOString()
  });
});
