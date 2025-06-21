# Personal Assistant with Gemini AI

A React-based personal assistant that uses Google's Gemini AI to provide intelligent responses to user queries via text or voice input.

## Features

- 🤖 Powered by Google Gemini AI
- 🎤 Voice input support
- ⌨️ Text input support
- 💬 Real-time chat interface
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast responses with fallback handling

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

- **Text Input**: Type your message in the input field and press Enter or click Send
- **Voice Input**: Click the microphone button and speak your message
- The assistant will respond using Gemini AI's advanced language model

## Error Handling

If the Gemini API is unavailable or returns an error, the application will fall back to predefined responses for common queries like:
- Greetings (hello, hi, hey)
- Time and date requests
- Weather inquiries
- Help requests
- Goodbyes

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