'use server';

/**
 * @fileOverview Generates a dynamic AI boss raid event for a specified career stream.
 *
 * - generateBossRaid - A function that creates a unique boss encounter.
 * - GenerateBossRaidInput - The input type for the generateBossRaid function.
 * - GenerateBossRaidOutput - The return type for the generateBossRaid function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateBossRaidInputSchema = z.object({
  streamName: z.string().describe('The career stream for the boss theme (e.g., "Software Development").'),
});
export type GenerateBossRaidInput = z.infer<typeof GenerateBossRaidInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The text of the difficult boss question.'),
  options: z.array(z.string()).describe('The possible answer options for the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  damage: z.number().int().min(50).max(200).describe('The amount of damage this question deals to the boss.'),
});

const GenerateBossRaidOutputSchema = z.object({
  bossName: z.string().describe("The epic name of the AI boss (e.g., 'The Legacy Code Hydra', 'The Market Crash Behemoth')."),
  bossDescription: z.string().describe("A dramatic, one-paragraph description of the boss and the challenge it represents."),
  bossAvatarHint: z.string().describe("A detailed prompt for an AI image generator to create a menacing avatar for the boss."),
  bossHealth: z.number().int().min(1000).max(5000).describe("The total health points of the boss."),
  quizBank: z.array(QuizQuestionSchema).min(20).describe("A large bank of at least 20 difficult questions related to the boss's theme."),
  rewards: z.object({
    xp: z.number().int().min(1000).describe("A large amount of XP awarded for defeating the boss."),
    coins: z.number().int().min(500).describe("A large amount of coins awarded for defeating the boss."),
    title: z.string().describe("An exclusive title awarded to the player (e.g., 'Hydra Slayer')."),
  }),
});
export type GenerateBossRaidOutput = z.infer<typeof GenerateBossRaidOutputSchema>;

export async function generateBossRaid(input: GenerateBossRaidInput): Promise<GenerateBossRaidOutput> {
  return generateBossRaidFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBossRaidPrompt',
  input: {schema: GenerateBossRaidInputSchema},
  output: {schema: GenerateBossRaidOutputSchema},
  prompt: `You are a legendary game master designing an epic AI boss raid for a career-focused game called "Career Clash".

The boss must be themed around a major, difficult challenge within the '{{{streamName}}}' career path.

INSTRUCTIONS:

1.  **Design the Boss**:
    *   Create a fearsome, creative name for the boss.
    *   Write a compelling description that introduces the threat.
    *   Provide a detailed image prompt for the boss's avatar, making it sound epic and menacing.
    *   Set a high health value for the boss.

2.  **Create the Challenge**:
    *   Generate a bank of at least 20 very difficult, expert-level multiple-choice questions about the '{{{streamName}}}' field.
    *   Each question must have 4 options, a correct answer, and a "damage" value. More difficult questions should deal more damage.

3.  **Define the Spoils**:
    *   Determine the rewards for victory: a large amount of XP and coins, and an exclusive, cool-sounding player title.

Return the entire raid encounter as a single JSON object.
`,
});

const generateBossRaidFlow = ai.defineFlow(
  {
    name: 'generateBossRaidFlow',
    inputSchema: GenerateBossRaidInputSchema,
    outputSchema: GenerateBossRaidOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
