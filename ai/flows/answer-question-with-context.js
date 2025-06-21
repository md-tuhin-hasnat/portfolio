'use server';
/**
 * @fileOverview AI agent that answers questions based on provided context.
 *
 * - answerQuestionWithContext - A function that answers question based on context.
 * - AnswerQuestionWithContextInput - The input type for the answerQuestionWithContext function.
 * - AnswerQuestionWithContextOutput - The return type for the answerQuestionWithContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionWithContextInputSchema = z.object({
  context: z.string().describe('The context to answer the question from.'),
  question: z.string().describe('The question to answer.'),
});

const ActionSchema = z.object({
  label: z.string().describe('The text to display on the button.'),
  link: z
    .string()
    .describe(
      'A URL to link to. This can be a web URL (https://) or a mailto: link.'
    ),
});

const AnswerQuestionWithContextOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'The answer to the question, formatted in Markdown for clear presentation.'
    ),
  suggestedQuestions: z
    .array(z.string())
    .describe(
      'A list of up to 3 relevant and short follow-up questions the user might ask next.'
    )
    .optional(),
  actions: z
    .array(ActionSchema)
    .optional()
    .describe(
      'A list of relevant action buttons to show the user. For example, if the question is about contact info, you could provide a button to email the person.'
    ),
});

export async function answerQuestionWithContext(
  input
) {
  return answerQuestionWithContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionWithContextPrompt',
  input: {schema: AnswerQuestionWithContextInputSchema},
  output: {schema: AnswerQuestionWithContextOutputSchema},
  prompt: `You are an AI assistant. Based on the provided context, answer the user's question.
- Format your answer using Markdown. Use lists, bolding, and other formatting to make the information clear and easy to read. When presenting structured data like work experience, projects, or education, use Markdown tables for a clean, organized layout.
- Generate a list of up to 3 relevant follow-up questions the user could ask.
- If the user's question relates to contact information, social media, or projects, provide relevant action buttons with links (e.g., a "Contact Me" button with a mailto: link, or a "View Project" button with a GitHub link).

Context:
{{{context}}}

Question: {{question}}`,
});

const answerQuestionWithContextFlow = ai.defineFlow(
  {
    name: 'answerQuestionWithContextFlow',
    inputSchema: AnswerQuestionWithContextInputSchema,
    outputSchema: AnswerQuestionWithContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
