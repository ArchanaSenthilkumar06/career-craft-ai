import { GoogleGenAI } from '@google/genai';

/**
 * Server-side Gemini AI Service
 * Encapsulated behind an interface so alternative LLM providers can be substituted if desired.
 */
export class GeminiService {
  private client: GoogleGenAI | null = null;
  private modelName: string;

  constructor() {
    this.modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
      try {
        this.client = new GoogleGenAI({ apiKey });
      } catch (err) {
        console.warn('[GeminiService] Initialization warning:', err);
      }
    }
  }

  public isConfigured(): boolean {
    return this.client !== null;
  }

  public getModelName(): string {
    return this.modelName;
  }

  /**
   * Learning Mentor conversational explanation
   */
  public async generateMentorExplanation(params: {
    query: string;
    topic: string;
    difficulty: string;
    personality: string;
    availableTimeMinutes: number;
  }): Promise<{ reply: string; actionItems: string[]; suggestedTopics: string[] }> {
    if (!this.client) {
      throw new Error('GEMINI_API_KEY is not configured on the server.');
    }

    const systemPrompt = `You are the CareercraftAI Learning Mentor with personality mode: "${params.personality}".
Your goal is to provide a grounded, high-clarity technical or academic explanation for "${params.query}" under topic "${params.topic}".
Target difficulty: ${params.difficulty}. The student has ${params.availableTimeMinutes} minutes available.
Rules:
- Never fabricate grades, scores, or false claims.
- Structure explanations with clear mental models and actionable bullet points.
- Respond in strictly valid JSON with keys: "reply" (markdown string), "actionItems" (array of strings), "suggestedTopics" (array of strings).`;

    const response = await this.client.models.generateContent({
      model: this.modelName,
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + `\n\nStudent question: ${params.query}` }] }
      ],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text || '{}';
    try {
      const parsed = JSON.parse(responseText);
      return {
        reply: parsed.reply || responseText,
        actionItems: parsed.actionItems || ['Review the core theorems', 'Take a practice quiz'],
        suggestedTopics: parsed.suggestedTopics || ['Fundamentals', 'Practice Problems']
      };
    } catch {
      return {
        reply: responseText,
        actionItems: ['Review core material'],
        suggestedTopics: [params.topic]
      };
    }
  }

  /**
   * Generates a 4-question quiz with answer key and explanations
   */
  public async generateQuiz(topic: string, difficulty: string): Promise<any[]> {
    if (!this.client) {
      throw new Error('GEMINI_API_KEY is not configured on the server.');
    }

    const prompt = `Generate a 4-question multiple-choice quiz on the topic "${topic}" at "${difficulty}" difficulty level.
Strict requirements:
- Return a JSON array of objects with keys:
  "id": string (e.g. "q-1")
  "question": string
  "options": array of exactly 4 strings
  "correctAnswerIndex": number (0, 1, 2, or 3)
  "explanation": detailed explanation of why the correct option is right and others are wrong
  "topic": "${topic}"
  "difficulty": "${difficulty}"
- Output strictly valid JSON.`;

    const response = await this.client.models.generateContent({
      model: this.modelName,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    try {
      return JSON.parse(response.text || '[]');
    } catch {
      throw new Error('Invalid JSON format received from model.');
    }
  }
}

export const geminiService = new GeminiService();
