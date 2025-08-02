
'use server';

/**
 * @fileOverview Generates a gamified, multi-stage learning roadmap using AI.
 *
 * - generateLearningRoadmap - A function that creates a multi-stage learning path for a given subject.
 * - GenerateLearningRoadmapInput - The input type for the generateLearningRoadmap function.
 * - GenerateLearningRoadmapOutput - The return type for the generateLearningRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateLearningRoadmapInputSchema = z.object({
  streamName: z.string().describe('The name of the learning stream or subject (e.g., "Software Development", "Data Science").'),
});
export type GenerateLearningRoadmapInput = z.infer<typeof GenerateLearningRoadmapInputSchema>;

const RoadmapNodeSchema = z.object({
    title: z.string().describe('The title of the learning module or level.'),
    description: z.string().describe('A brief, one-sentence description of what this level covers.'),
    xp: z.number().describe('Experience points awarded for completing this level (between 100 and 500).'),
});
export type RoadmapNode = z.infer<typeof RoadmapNodeSchema>;

const StageSchema = z.object({
  stageName: z.enum(['Beginning', 'Intermediate', 'Advance']),
  levels: z.array(RoadmapNodeSchema).describe('An array of learning levels within this stage.'),
});

const GenerateLearningRoadmapOutputSchema = z.object({
  roadmap: z.array(StageSchema).describe('An array of learning stages, each containing multiple levels.'),
});
export type GenerateLearningRoadmapOutput = z.infer<typeof GenerateLearningRoadmapOutputSchema>;

export async function generateLearningRoadmap(input: GenerateLearningRoadmapInput): Promise<GenerateLearningRoadmapOutput> {
  return generateLearningRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningRoadmapPrompt',
  input: {schema: GenerateLearningRoadmapInputSchema},
  output: {schema: GenerateLearningRoadmapOutputSchema},
  prompt: `You are an expert curriculum designer for a gamified learning platform called "Career Clash".
  
Your task is to generate a detailed, multi-stage learning roadmap for the subject '{{{streamName}}}'.

The roadmap must be divided into exactly three stages, in this order: "Beginning", "Intermediate", and "Advance".
- The "Beginning" stage should have 25 levels, starting with the most fundamental concepts.
- The "Intermediate" stage should have 50 levels, building upon the basics with more complex topics.
- The "Advance" stage should have 25 levels, covering expert-level topics and specialization.

For EACH level within EACH stage, you MUST provide:
1.  A concise, engaging 'title' for the learning module.
2.  A one-sentence 'description' of the key topics covered.
3.  An 'xp' value between 100 and 500, with XP increasing for more advanced levels.

**CRITICAL INSTRUCTIONS**:
1. The final output MUST be a valid JSON object.
2. The root object must have a 'roadmap' property which is an array of stage objects.
3. There must be exactly THREE stage objects in the 'roadmap' array.
4. Each stage object must have a 'stageName' ("Beginning", "Intermediate", or "Advance") and a 'levels' array.
5. Every single level object in every 'levels' array MUST be a complete object containing the 'title', 'description', and 'xp' fields.
6. Do not leave any objects incomplete. Double-check your final output to ensure the JSON is not truncated and every entry is complete before finishing your response.

Return the entire roadmap as a single JSON object.
`,
});

const generateLearningRoadmapFlow = ai.defineFlow(
  {
    name: 'generateLearningRoadmapFlow',
    inputSchema: GenerateLearningRoadmapInputSchema,
    outputSchema: GenerateLearningRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
