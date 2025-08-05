
'use server';

/**
 * @fileOverview Generates a comprehensive, 100-level learning roadmap for a given skill.
 *
 * - generateLearningRoadmap - Creates a structured learning path with three stages.
 * - GenerateLearningRoadmapInput - The input type for the generateLearningRoadmap function.
 * - GenerateLearningRoadmapOutput - The return type for the generateLearningRoadmap function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateLearningRoadmapInputSchema = z.object({
  streamName: z.string().describe('The name of the skill or career path to generate a roadmap for (e.g., "Canva Design", "Python for Data Science").'),
});
export type GenerateLearningRoadmapInput = z.infer<typeof GenerateLearningRoadmapInputSchema>;

const RoadmapLevelSchema = z.object({
  id: z.string().describe("A unique identifier for the level (e.g., 'level-1', 'level-2')."),
  title: z.string().describe('The concise title of the learning level.'),
  description: z.string().describe('A one-sentence description of what the level covers.'),
  xp: z.number().int().describe('The experience points awarded for completing the level.'),
  coins: z.number().int().describe('The coins awarded for completing the level.'),
});

const GenerateLearningRoadmapOutputSchema = z.object({
    streamName: z.string().describe('The name of the skill the roadmap is for.'),
    levels: z.array(RoadmapLevelSchema).describe('The complete, 100-level learning roadmap.'),
});
export type GenerateLearningRoadmapOutput = z.infer<typeof GenerateLearningRoadmapOutputSchema>;


export async function generateLearningRoadmap(input: GenerateLearningRoadmapInput): Promise<GenerateLearningRoadmapOutput> {
  return generateLearningRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningRoadmapPrompt',
  input: { schema: GenerateLearningRoadmapInputSchema },
  output: { schema: GenerateLearningRoadmapOutputSchema },
  prompt: `You are an expert curriculum designer tasked with creating a 100-level learning roadmap for the skill: '{{{streamName}}}'.

  INSTRUCTIONS:
  1.  **Total Levels**: The roadmap must have exactly 100 levels.
  2.  **Content per Level**: For each of the 100 levels, you must generate:
      -   \`id\`: A unique identifier string in the format 'level-N' (e.g., 'level-1', 'level-26', 'level-100').
      -   \`title\`: A clear, concise title for the topic covered in that level.
      -   \`description\`: A simple, one-sentence summary of the level's content.
      -   \`xp\`: Award XP starting from 100 for level 1 and increasing by 5-10 for each subsequent level.
      -   \`coins\`: Award coins starting from 10 for level 1 and increasing by 1-2 for each subsequent level.
  3.  **Progression**: The curriculum must be logical and progressive. Start with absolute fundamentals and build up to complex, expert-level concepts and projects. The final level should be a capstone or mastery review.
  4.  **Output**: Return the entire roadmap as a single JSON object matching the defined output schema. Ensure the root object has a 'streamName' and a 'levels' array with 100 items.
  `,
});


const generateLearningRoadmapFlow = ai.defineFlow(
  {
    name: 'generateLearningRoadmapFlow',
    inputSchema: GenerateLearningRoadmapInputSchema,
    outputSchema: GenerateLearningRoadmapOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
