// For Node.js environments
import 'dotenv/config'
import { GoogleGenAI } from '@google/genai';

//API SECRET
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//Create a Gemini Client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// main func declaration
export async function gemini_api_call(user_query) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: user_query,
        });
        
        // Extract just the text content from the response
        const textContent = response.candidates[0].content.parts[0].text;
        return textContent;
    } catch (error) {
        console.error('Error in Gemini API call:', error);
        throw error;
    }
}

// main();