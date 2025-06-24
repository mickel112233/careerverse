'use server';
/**
 * @fileOverview Generates learning content and a quiz for a specific topic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateLearningContentInputSchema = z.object({
  topicTitle: z.string().describe('The title of the learning topic.'),
  streamName: z.string().describe('The subject stream this topic belongs to (e.g., "Software Development").'),
});
export type GenerateLearningContentInput = z.infer<typeof GenerateLearningContentInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe('The text of the quiz question.'),
    options: z.array(z.string()).describe('An array of 4 possible answer options.'),
    correctAnswer: z.string().describe('The correct answer from the options.'),
    explanation: z.string().describe('A brief explanation of why the correct answer is right.'),
});

const GenerateLearningContentOutputSchema = z.object({
  learningContent: z.string().describe('A comprehensive, one-page lesson on the topic, formatted as a single HTML string. Use headings (h3, h4), paragraphs (p), lists (ul, li), and bold/italic tags for structure.'),
  quiz: z.object({
    title: z.string().describe('A title for the quiz related to the topic.'),
    questions: z.array(QuizQuestionSchema).min(8).max(10).describe('An array of 8-10 quiz questions based on the learning content.'),
  }),
});
export type GenerateLearningContentOutput = z.infer<typeof GenerateLearningContentOutputSchema>;

export async function generateLearningContent(input: GenerateLearningContentInput): Promise<GenerateLearningContentOutput> {
  return generateLearningContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningContentPrompt',
  input: {schema: GenerateLearningContentInputSchema},
  output: {schema: GenerateLearningContentOutputSchema},
  prompt: `You are an expert educator and content creator for a gamified learning platform. Your task is to generate a comprehensive, single-page lesson and an accompanying quiz for a specific topic within a learning stream.

Subject Stream: '{{{streamName}}}'
Topic to Cover: '{{{topicTitle}}}'

INSTRUCTIONS:

1.  **Generate Learning Content**:
    *   Create a detailed and engaging lesson about the '{{{topicTitle}}}'.
    *   The content should be structured logically, starting with an introduction, covering core concepts with examples, and ending with a summary.
    *   The entire lesson must be formatted as a **single HTML string**. Use tags like <h3>, <h4>, <p>, <ul>, <li>, <strong>, and <em> to create a well-structured and readable page. DO NOT use markdown.

2.  **Generate a Quiz**:
    *   Based **only** on the learning content you just created, generate a quiz.
    *   The quiz must have a title.
    *   The quiz must contain between 8 and 10 multiple-choice questions.
    *   Each question must have exactly 4 options.
    *   For each question, specify the correct answer and a brief explanation for why it's correct.

Return the entire output as a single JSON object matching the defined schema.
`,
});

const generateLearningContentFlow = ai.defineFlow(
  {
    name: 'generateLearningContentFlow',
    inputSchema: GenerateLearningContentInputSchema,
    outputSchema: GenerateLearningContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
