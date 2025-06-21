// Simple test to verify Gemini API integration
// Run this with: node test-gemini.js

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || 'your_api_key_here';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function testGeminiAPI() {
  if (GEMINI_API_KEY === 'your_api_key_here') {
    console.log('❌ Please set your Gemini API key in the .env file');
    console.log('   Get your key from: https://makersuite.google.com/app/apikey');
    return;
  }

  try {
    console.log('🧪 Testing Gemini API...');
    
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
                text: "Hello! Can you tell me a short joke?"
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini API');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    console.log('✅ Gemini API test successful!');
    console.log('🤖 Response:', responseText);
    
  } catch (error) {
    console.error('❌ Gemini API test failed:', error.message);
    console.log('💡 Make sure your API key is correct and you have internet connection');
  }
}

testGeminiAPI(); 