import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Read the comma-separated keys from the environment variable.
const apiKeys = (process.env.GOOGLE_API_KEYS || '').split(',').filter(k => k.trim());

// If no keys are found, log a warning.
if (apiKeys.length === 0) {
  console.warn('WARNING: No Google AI API keys found in GOOGLE_API_KEYS environment variable. AI features may not work.');
}

// Simple function to get a random key from the list.
// This will be called once when the module is loaded, providing a different key
// for each server instance, which helps distribute the load.
const getApiKey = () => {
    if (apiKeys.length === 0) return undefined;
    const index = Math.floor(Math.random() * apiKeys.length);
    return apiKeys[index];
};

export const ai = genkit({
  plugins: [googleAI({apiKey: getApiKey()})],
  model: 'googleai/gemini-2.0-flash',
});
