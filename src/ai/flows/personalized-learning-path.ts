// src/ai/flows/personalized-learning-path.ts
'use server';

/**
 * @fileOverview AI-driven personalized learning path recommendations.
 *
 * This file defines a Genkit flow to suggest personalized learning paths based on a user's skill level and career goals.
 * It includes the `getPersonalizedLearningPath` function, along with its input and output types.
 *
 * - getPersonalizedLearningPath -  A function that returns personalized learning path recommendations based on user input.
 * - PersonalizedLearningPathInput - The input type for the getPersonalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The output type for the getPersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const PersonalizedLearningPathInputSchema = z.object({
  skillLevel: z
    .string()
    .describe('The current skill level of the user (e.g., beginner, intermediate, expert).'),
  careerGoals: z
    .string()
    .describe('The career goals of the user (e.g., software engineer, data scientist, project manager).'),
  preferredLearningStyle: z
    .string()
    .optional()
    .describe('The preferred learning style of the user (e.g., visual, auditory, kinesthetic).'),
  availableTime: z
    .string()
    .optional()
    .describe('The amount of time the user has available for learning each week (e.g., 5 hours, 10 hours).'),
});

export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

// Define the output schema
const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z.array(
    z.object({
      moduleName: z.string().describe('The name of the learning module.'),
      description: z.string().describe('A brief description of the learning module.'),
      estimatedDuration: z.string().describe('The estimated duration of the learning module.'),
      topics: z.array(z.string()).describe('A list of topics covered in the learning module.'),
      resources: z
        .array(z.string())
        .describe('A list of resources for the learning module (e.g., links to articles, videos, tutorials).')
        .optional(),
    })
  ).describe('A list of learning modules that form the personalized learning path.'),
  reasoning: z
    .string()
    .describe('Explanation of why these modules are the best learning path for the user.'),
});

export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
>;

// Exported function to call the flow
export async function getPersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

// Define the prompt
const personalizedLearningPathPrompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI career coach that specializes in creating personalized learning paths for users based on their skill level, career goals, preferred learning style, and available time.

  Based on the following user information, create a personalized learning path with a list of modules that will help them achieve their goals. Each module should have a name, a brief description, an estimated duration, a list of topics, and a list of resources.
  Also explain why these modules are the best learning path for the user. Include consideration for the learning style and available time when constructing the path.

  Skill Level: {{{skillLevel}}}
  Career Goals: {{{careerGoals}}}
  Preferred Learning Style: {{{preferredLearningStyle}}}
  Available Time: {{{availableTime}}}

  Ensure that the learning path is tailored to the user's specific needs and that the modules are presented in a logical order.
  `,
});

// Define the flow
const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await personalizedLearningPathPrompt(input);
    return output!;
  }
);
