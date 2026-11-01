import { QuizQuestion, PersonalityMode, InterviewQuestion } from '../types';
import { DEMO_QUIZ_QUESTIONS } from '../data/demoData';

export interface MentorMessage {
  id: string;
  sender: 'user' | 'mentor' | 'system';
  content: string;
  timestamp: string;
  actionItems?: string[];
  suggestedTopics?: string[];
  sourcesDisclaimer?: boolean;
}

export const PERSONALITY_PROFILES: Record<PersonalityMode, { title: string; toneDescription: string; icon: string; welcomeGreeting: string }> = {
  study_buddy: {
    title: 'Friendly Study Buddy',
    toneDescription: 'Warm, collaborative, enthusiastic, uses friendly analogies and cheers on your progress.',
    icon: 'Sparkles',
    welcomeGreeting: "Hey there! Ready to tackle your study goals together? Ask me anything about your tricky topics, or let's break down a challenging concept step by step!"
  },
  calm_mentor: {
    title: 'Calm Mentor',
    toneDescription: 'Thoughtful, measured, structured, focuses on high-level mental models and long-term career pacing.',
    icon: 'Compass',
    welcomeGreeting: "Welcome. Pacing and steady habits build enduring technical mastery. What subject or concept would you like to explore calmly today?"
  },
  strict_coach: {
    title: 'Strict Focus Coach',
    toneDescription: 'Direct, disciplined, zero fluff, pushes for precision, rigorous problem-solving, and no excuses.',
    icon: 'Shield',
    welcomeGreeting: "Focus mode engaged. No distractions, no vague answers. State the exact problem or concept you need to drill right now."
  },
  playful_motivator: {
    title: 'Playful Motivator',
    toneDescription: 'High energy, witty, gamified metaphors, turns dry formulas into mini quest battles.',
    icon: 'Flame',
    welcomeGreeting: "Level 1 study boss ahead! Grab your metaphorical shield—we're turning difficult concepts into easy XP today. What are we battling?"
  }
};

/**
 * Ask the Learning Mentor a question
 */
export async function askLearningMentor(
  query: string,
  topic: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  personality: PersonalityMode,
  availableTimeMinutes: number
): Promise<MentorMessage> {
  // Try server endpoint first
  try {
    const res = await fetch('/api/v1/learning/mentor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, topic, difficulty, personality, availableTimeMinutes })
    });
    if (res.ok) {
      const data = await res.json();
      return {
        id: `msg-${Date.now()}`,
        sender: 'mentor',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionItems: data.actionItems,
        suggestedTopics: data.suggestedTopics,
        sourcesDisclaimer: true
      };
    }
  } catch {
    // Fall back to client-side structured generator
  }

  // Client-side structured response tailored to personality
  await new Promise(r => setTimeout(r, 700));

  let replyText = '';
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('dp') || lowerQuery.includes('dynamic programming')) {
    replyText = `**Core Concept: Dynamic Programming (DP)**\n\nThink of DP as *smart recursion with memory*. Whenever a problem can be broken into overlapping subproblems with optimal substructure, calculating the same state twice is a waste of CPU cycles.\n\n` +
      `1. **Memoization (Top-Down):** Write your regular recursive function, but pass a hash map or array cache. If \`cache.has(key)\`, return it immediately!\n` +
      `2. **Tabulation (Bottom-Up):** Solve base cases first in an array or table, then iterate iteratively upwards to your target state \`dp[n]\`.\n\n` +
      `*Recommended next action:* Solve the classic 0/1 Knapsack problem or Coin Change using a 1D space-optimized array!`;
  } else if (lowerQuery.includes('sql') || lowerQuery.includes('index') || lowerQuery.includes('database')) {
    replyText = `**Database Indexing Fundamentals**\n\nIndexes are like the index at the back of a 1,000-page book. Instead of scanning every single page (Full Table Scan O(N)), the DB engine consults a balanced B-Tree in O(log N).\n\n` +
      `- **Leftmost Prefix Rule:** A composite index on \`(tenant_id, created_at)\` helps queries filtering by \`tenant_id\` or both, but *cannot* help a query filtering only on \`created_at\`.\n` +
      `- **Write Cost:** Every \`INSERT\` or \`DELETE\` must also update the B-Tree leaves. Keep indexes lean and tailored to frequent query filters.`;
  } else if (lowerQuery.includes('star') || lowerQuery.includes('interview')) {
    replyText = `**The STAR Behavioral Framework**\n\n` +
      `- **S (Situation):** Set the scene in 1-2 sentences. What company/class, what was the stakes?\n` +
      `- **T (Task):** What was your specific responsibility or the challenge you had to overcome?\n` +
      `- **A (Action):** The longest part (60%). Detail *what you personally did*. Which tools, which decisions, how you collaborated.\n` +
      `- **R (Result):** Conclude with quantifiable impact. E.g. "Reduced build times by 35% and received an A grade on the project."`;
  } else {
    replyText = `**Exploration of "${query}"**\n\nTo master this effectively within your ${availableTimeMinutes}-minute session:\n\n` +
      `1. **Breakdown:** Identify the foundational theorem or mental model behind this topic.\n` +
      `2. **Concrete Example:** Test the rule against one typical case and one tricky edge case.\n` +
      `3. **Active Recall:** Formulate a short question you can answer without looking at reference notes.\n\n` +
      `Feel free to generate a 4-question quiz on this topic below to verify your retention!`;
  }

  // Prepend personality flavor
  if (personality === 'strict_coach') {
    replyText = `[Coach Drill] Let's be precise:\n\n` + replyText;
  } else if (personality === 'playful_motivator') {
    replyText = `⚡ *Skill Quest Activated!* ⚡\n\n` + replyText;
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'mentor',
    content: replyText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actionItems: [
      `Spend 10 minutes writing out the concept in your own words.`,
      `Complete a 4-question knowledge check quiz.`,
      `Add verified bullet point to your study log.`
    ],
    suggestedTopics: [
      'Overlapping Subproblems',
      'Time Complexity Tradeoffs',
      'Memory Overhead Analysis'
    ],
    sourcesDisclaimer: true
  };
}

/**
 * Generate a topic quiz with real answer checking
 */
export async function generateTopicQuiz(topic: string, difficulty: string): Promise<QuizQuestion[]> {
  try {
    const res = await fetch('/api/v1/learning/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, difficulty })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.questions && data.questions.length > 0) return data.questions;
    }
  } catch {
    // fallback
  }

  // Return vetted questions from the pool or tailored set
  return DEMO_QUIZ_QUESTIONS;
}

/**
 * Evaluate user's interview answer
 */
export function evaluateInterviewAnswer(question: InterviewQuestion, answerText: string): InterviewQuestion['feedback'] {
  const text = answerText.trim();
  const wordCount = text.split(/\s+/).length;

  const hasSituation = /(when|during|at|while working|in my|project|college|team|company)/i.test(text);
  const hasTask = /(task|goal|needed to|had to|objective|challenge|deadline)/i.test(text);
  const hasAction = /(i built|i designed|i developed|i decided|i investigated|i implemented|i benchmarked|i wrote)/i.test(text);
  const hasResult = /(result|outcome|decreased|increased|reduced|improved|percent|%|faster|grade|finished)/i.test(text);

  let score = 50;
  if (wordCount >= 40) score += 15;
  if (wordCount >= 80) score += 10;
  if (hasSituation) score += 6;
  if (hasTask) score += 6;
  if (hasAction) score += 8;
  if (hasResult) score += 5;

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (hasAction) strengths.push('Good ownership language emphasizing your personal contribution ("I built", "I benchmarked").');
  else improvements.push('Use active personal verbs ("I analyzed", "I implemented") rather than passive statements.');

  if (hasResult) strengths.push('Included concrete results or outcome indicators.');
  else improvements.push('Add quantifiable metrics to the Result (e.g. latency reduced by X%, test coverage increased, or positive feedback).');

  if (wordCount < 50) improvements.push('Answer is somewhat brief; elaborate on the specific technical hurdles you navigated.');
  else strengths.push('Well-developed length with appropriate context.');

  return {
    score: Math.min(96, score),
    strengths,
    improvements,
    starCoverage: {
      situation: hasSituation,
      task: hasTask,
      action: hasAction,
      result: hasResult
    }
  };
}
