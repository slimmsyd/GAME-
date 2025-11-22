import OpenAI from "openai";

/**
 * OpenAI Client Configuration
 * 
 * Initializes the OpenAI client with the API key from environment variables.
 */

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "Missing OPENAI_API_KEY environment variable. Please add it to .env.local"
  );
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
