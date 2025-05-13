# Gemini API Web App

A simple web application that allows users to interact with Google's Gemini AI model through a clean web interface.

## Features

- Clean, minimalist UI for sending queries to Gemini AI
- Node.js Express backend that handles API communication
- Frontend with real-time response display and basic markdown formatting
- Environment variable support for secure API key management

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Usage

1. Start the server:
   ```
   node app.js
   ```
2. Open your browser and navigate to `http://localhost:3000`
3. Type your query in the text area and click "Send to Gemini!"

## Technologies Used

- Express.js
- Google Genai JavaScript SDK
- Vanilla JavaScript (Frontend)
- Environment variable management with dotenv

## Project Structure

- `app.js` - Express server setup and API endpoint
- `gemini_api_call.js` - Handles communication with Gemini API
- `public/index.html` - Main HTML interface
- `public/frontendScript.js` - Frontend logic and response formatting

## License

MIT

## Notes

This is a simple implementation and may require additional error handling and security measures for production use.
