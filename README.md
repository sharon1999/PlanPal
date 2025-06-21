# PlanPal - Your AI-Powered Day Planner & Reminder Assistant

PlanPal is a React-based personal assistant that helps you plan your day, manage tasks, and stay on top of your reminders using Google's Gemini AI. Whether you prefer typing or speaking, PlanPal is here to help you organize your life more efficiently.

## Features

- 🤖 **AI-Powered Planning**: Powered by Google Gemini AI for intelligent day planning
- 📅 **Daily Schedule Management**: Create and manage your daily schedules
- ✅ **Task & Reminder System**: Set reminders and track your tasks
- 🎤 **Voice Input Support**: Speak your plans and reminders naturally
- ⌨️ **Text Input Support**: Type your plans and tasks
- 💬 **Conversational Interface**: Chat naturally with your AI planner
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- ⚡ **Real-time Updates**: Instant responses and smart suggestions
- 🔄 **Fallback Handling**: Works even when AI is unavailable

## What PlanPal Can Do

### Daily Planning
- Help you plan your day from morning to evening
- Suggest optimal schedules based on your tasks
- Break down complex projects into manageable steps
- Prioritize tasks based on importance and deadlines

### Reminder Management
- Set reminders for meetings, appointments, and tasks
- Get smart notifications about upcoming deadlines
- Track recurring tasks and habits
- Manage your to-do lists efficiently

### Smart Suggestions
- Suggest time blocks for different activities
- Recommend breaks and rest periods
- Help you balance work and personal tasks
- Provide productivity tips and insights

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Gemini API

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root directory
3. Add your API key to the `.env` file:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Getting Started
1. **Open PlanPal** in your browser
2. **Start Planning**: Say "Help me plan my day" or "What should I do today?"
3. **Set Reminders**: Try "Remind me to call John at 3 PM" or "Set a reminder for my dentist appointment tomorrow"
4. **Manage Tasks**: Ask "What tasks do I have today?" or "Add 'buy groceries' to my to-do list"

### Voice Commands
- "Plan my day"
- "Set a reminder for [task] at [time]"
- "What's on my schedule today?"
- "Add [task] to my to-do list"
- "What should I prioritize today?"

### Text Commands
- Type your planning requests naturally
- Ask for schedule suggestions
- Request task prioritization
- Get productivity advice

## Example Conversations

**User**: "Help me plan my day"
**PlanPal**: "I'd be happy to help you plan your day! Let me know what tasks you have and I'll help you organize them efficiently."

**User**: "I have a meeting at 2 PM, need to finish a report, and want to exercise"
**PlanPal**: "Great! Here's a suggested schedule for your day:
- 9-11 AM: Work on your report (most important task)
- 11 AM-12 PM: Exercise (good energy boost)
- 12-1 PM: Lunch break
- 1-2 PM: Final prep for your meeting
- 2-3 PM: Meeting
- 3-5 PM: Continue with report or other tasks"

## Error Handling

If the Gemini API is unavailable or returns an error, PlanPal will fall back to predefined responses for common planning queries like:
- Daily planning requests
- Time and date information
- Basic task management
- General productivity advice

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI API
- Web Speech API (for voice input)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Gemini API key from Google AI Studio | Yes |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

- 📱 Mobile app version
- 🔔 Push notifications for reminders
- 📊 Analytics and productivity insights
- 🔗 Calendar integration (Google Calendar, Outlook)
- 👥 Team planning features
- 📈 Progress tracking and goal setting

## Contributing

Feel free to contribute to PlanPal! Whether it's bug fixes, new features, or improvements to the AI prompts, your contributions are welcome.

---

**PlanPal** - Making your day more organized, one plan at a time! 🚀 