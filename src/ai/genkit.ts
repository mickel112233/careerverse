import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Read the single API key from the environment variable.
const apiKey = process.env.GOOGLE_API_KEY;

// If no key is found, log a warning.
if (!apiKey) {
  console.warn('WARNING: No Google AI API key found in GOOGLE_API_KEY environment variable. AI features may not work.');
}

export const ai = genkit({
  plugins: [googleAI({apiKey: apiKey})],
  model: 'googleai/gemini-2.0-flash',
});
