'use server';

/**
 * @fileOverview Generates AI competition quizzes based on a specified job role.
 *
 * - generateAiCompetitionQuiz - A function that generates a quiz for a given job role.
 * - GenerateAiCompetitionQuizInput - The input type for the generateAiCompetitionQuiz function.
 * - GenerateAiCompetitionQuizOutput - The return type for the generateAiCompetitionQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiCompetitionQuizInputSchema = z.object({
  jobRole: z.string().describe('The job role for which to generate the quiz.'),
  numQuestions: z.number().describe('The number of questions to generate for the quiz.').default(5),
});
export type GenerateAiCompetitionQuizInput = z.infer<typeof GenerateAiCompetitionQuizInputSchema>;

const GenerateAiCompetitionQuizOutputSchema = z.object({
  quizTitle: z.string().describe('The title of the generated quiz.'),
  questions: z.array(
    z.object({
      question: z.string().describe('The text of the question.'),
      options: z.array(z.string()).describe('The possible answer options for the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('The questions in the generated quiz.'),
});
export type GenerateAiCompetitionQuizOutput = z.infer<typeof GenerateAiCompetitionQuizOutputSchema>;

export async function generateAiCompetitionQuiz(input: GenerateAiCompetitionQuizInput): Promise<GenerateAiCompetitionQuizOutput> {
  return generateAiCompetitionQuizFlow(input);
}

const generateAiCompetitionQuizPrompt = ai.definePrompt({
  name: 'generateAiCompetitionQuizPrompt',
  input: {schema: GenerateAiCompetitionQuizInputSchema},
  output: {schema: GenerateAiCompetitionQuizOutputSchema},
  prompt: `You are an AI quiz generator. You will generate a quiz for a given job role.

  Job Role: {{{jobRole}}}
  Number of Questions: {{{numQuestions}}}

  The quiz should have a title, and a list of questions. Each question should have a question, a list of options, and a correct answer.
  Make sure the options are distinct, and that only one of them is correct.
  The quiz should be challenging and test the user's knowledge of the job role.

  Return the quiz in the following JSON format:
  {{$type: GenerateAiCompetitionQuizOutput}}
  `,
});

const generateAiCompetitionQuizFlow = ai.defineFlow(
  {
    name: 'generateAiCompetitionQuizFlow',
    inputSchema: GenerateAiCompetitionQuizInputSchema,
    outputSchema: GenerateAiCompetitionQuizOutputSchema,
  },
  async input => {
    const {output} = await generateAiCompetitionQuizPrompt(input);
    return output!;
  }
);
