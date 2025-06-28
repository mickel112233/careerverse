
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
  bossLevel: z.number().min(1).max(35).describe('The difficulty level of the boss, from 1 to 35.'),
});
export type GenerateBossRaidInput = z.infer<typeof GenerateBossRaidInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The text of the difficult boss question.'),
  options: z.array(z.string()).describe('The possible answer options for the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  damage: z.number().int().min(50).max(200).describe('The amount of damage this question deals to the boss.'),
  bossAttackDamage: z.number().int().min(25).max(100).describe("The damage the boss deals to the player's party if they answer this question incorrectly."),
});

const GenerateBossRaidOutputSchema = z.object({
  bossName: z.string().describe("The epic name of the AI boss (e.g., 'The Legacy Code Hydra', 'The Market Crash Behemoth')."),
  bossDescription: z.string().describe("A dramatic, one-paragraph description of the boss and the challenge it represents."),
  bossAvatarHint: z.string().describe("A detailed prompt for an AI image generator to create a menacing avatar for the boss."),
  bossHealth: z.number().int().min(1000).max(5000).describe("The total health points of the boss."),
  partyHealth: z.number().int().min(800).max(1500).describe("The total health points of the player's party."),
  quizBank: z.array(QuizQuestionSchema).min(20).describe("A large bank of at least 20 difficult questions related to the boss's theme."),
  rewards: z.object({
    xp: z.number().int().min(1000).describe("A large amount of XP awarded for defeating the boss."),
    coins: z.number().int().describe("Coins awarded for defeating the boss. For levels 1-14, this must be between 100-300. For levels 15-35, this must be between 300-1000."),
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

The boss must be themed around a major, difficult challenge within the '{{{streamName}}}' career path. Answering a question correctly damages the boss. Answering incorrectly results in the boss attacking the player's party.

The difficulty of the entire encounter MUST be scaled according to the provided bossLevel: {{{bossLevel}}}.
- A level 1 boss should be a moderately challenging introduction.
- A level 35 boss should be a nearly impossible, monumental challenge for a full party.
- All stats (boss health, party health, question damage, boss attack damage) and question difficulty must scale exponentially with the level.

INSTRUCTIONS:

1.  **Design the Boss**:
    *   Create a fearsome, creative name for the boss.
    *   Write a compelling description that introduces the threat.
    *   Provide a detailed image prompt for the boss's avatar, making it sound epic and menacing.
    *   Set a health value for the boss, scaled by \`bossLevel\`.
    *   Set a health value for the player's party, scaled by \`bossLevel\`.

2.  **Create the Challenge**:
    *   Generate a bank of at least 20 multiple-choice questions about the '{{{streamName}}}' field. The difficulty of these questions must increase significantly with the \`bossLevel\`.
    *   Each question must have 4 options, a correct answer, a "damage" value, and a "bossAttackDamage" value. These values must also be scaled based on the \`bossLevel\`.

3.  **Define the Spoils**:
    *   Determine the rewards for victory: a large amount of XP, an exclusive player title, and a specific amount of coins.
    *   The coin reward MUST follow these rules based on the \`bossLevel\`:
        *   If \`bossLevel\` is between 1 and 14, the 'coins' reward must be an integer between 100 and 300.
        *   If \`bossLevel\` is 15 or higher, the 'coins' reward must be an integer between 300 and 1000.
    *   XP and the coolness of the title should also scale with the \`bossLevel\`.

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
