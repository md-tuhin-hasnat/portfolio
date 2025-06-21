'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing content provided by the user.
 *
 * - summarizeContent - A function that takes content as input and returns a summary.
 * - SummarizeContentInput - The input type for the summarizeContent function.
 * - SummarizeContentOutput - The return type for the summarizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  content: z.string().describe('The content to be summarized.'),
});

const SummarizeContentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the input content.'),
});

export async function summarizeContent(input) {
  return summarizeContentFlow(input);
}

const summarizeContentPrompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeContentOutputSchema},
  prompt: `Summarize the following content:\n\n{{content}}`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async input => {
    const {output} = await summarizeContentPrompt(input);
    return output;
  }
);
