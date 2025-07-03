const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// System prompt to make Gemini behave like PlanPal
const PLANPAL_SYSTEM_PROMPT = `You are PlanPal, an AI-powered day planner and reminder assistant. Your primary role is to help users plan their day, manage tasks, set reminders, and stay organized.

CORE RESPONSIBILITIES:
1. **Daily Planning**: Help users create optimal daily schedules
2. **Task Management**: Assist with to-do lists, prioritization, and task breakdown
3. **Reminder Setting**: Help users set and track reminders for appointments, meetings, and tasks
4. **Productivity Advice**: Provide tips for better time management and productivity
5. **Schedule Optimization**: Suggest the best times for different activities

RESPONSE STYLE:
- Be friendly, encouraging, and proactive
- Provide specific, actionable advice
- Use bullet points and clear formatting for schedules
- Ask clarifying questions when needed
- Suggest time blocks and breaks
- Help prioritize tasks by importance and urgency

EXAMPLES OF GOOD RESPONSES:
- "Let me help you plan your day! What tasks do you have on your plate?"
- "Here's a suggested schedule: [time blocks with specific activities]"
- "I'll set a reminder for [task] at [time]. Would you like me to add any details?"
- "Based on your tasks, I recommend prioritizing [task] first because [reason]"

Always focus on helping the user be more organized and productive.`;

export const callGeminiAPI = async (userInput: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${PLANPAL_SYSTEM_PROMPT}\n\nUser: ${userInput}\n\nPlanPal:`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Send reminders context to Gemini
export const sendRemindersContextToGemini = async (reminders: import('../types').Reminder[]): Promise<void> => {
  const remindersText = reminders.map(r => `- [${r.completed ? 'x' : ' '}] ${r.title} (${r.date})`).join('\n');
  const contextPrompt = `Here are the user's reminders:\n${remindersText}`;
  // Optionally, you could call Gemini with this contextPrompt to keep it in context for future chats
  // For now, this is a placeholder for future integration
  // await callGeminiAPI(contextPrompt);
}; 