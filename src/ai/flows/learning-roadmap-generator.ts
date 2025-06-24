'use server';

/**
 * @fileOverview Generates a gamified learning roadmap using AI.
 *
 * - generateLearningRoadmap - A function that creates a multi-level learning path for a given subject.
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

const GenerateLearningRoadmapOutputSchema = z.object({
  roadmap: z.array(RoadmapNodeSchema).describe('An array of at least 50 learning levels that form the roadmap.'),
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
  
Your task is to generate a detailed learning roadmap for a specific subject stream. The roadmap must be broken down into a series of levels, starting from fundamental concepts and progressively advancing to expert-level topics.

For the subject '{{{streamName}}}', create a comprehensive list of at least 50 learning levels. Base the content on the most popular and authoritative books, courses, and real-world skills for this field.

For each level, provide:
1.  A concise, engaging title for the learning module.
2.  A one-sentence description of the key topics covered.
3.  The XP (Experience Points) a user would gain upon completion. Use values between 100 and 500, with XP increasing for more advanced levels.

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
