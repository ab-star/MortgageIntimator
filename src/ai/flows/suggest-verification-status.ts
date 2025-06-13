'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting a verification status (Verified or Rejected)
 * based on the analysis of documents uploaded with a NOI request.
 *
 * @fileOverview
 * - suggestVerificationStatus -  A function that analyzes uploaded documents and suggests a verification status.
 * - SuggestVerificationStatusInput - The input type for the suggestVerificationStatus function.
 * - SuggestVerificationStatusOutput - The output type for the suggestVerificationStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVerificationStatusInputSchema = z.object({
  titleDeedDataUri: z
    .string()
    .describe(
      "The title deed document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  loanLetterDataUri: z
    .string()
    .describe(
      "The loan letter document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  proofDocsDataUri: z
    .string()
    .describe(
      "The proof documents, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestVerificationStatusInput = z.infer<typeof SuggestVerificationStatusInputSchema>;

const SuggestVerificationStatusOutputSchema = z.object({
  suggestedStatus: z
    .enum(['Verified', 'Rejected'])
    .describe('The suggested verification status based on the document analysis.'),
  reason: z
    .string()
    .describe('The reasoning behind the suggested verification status.'),
});
export type SuggestVerificationStatusOutput = z.infer<typeof SuggestVerificationStatusOutputSchema>;

export async function suggestVerificationStatus(
  input: SuggestVerificationStatusInput
): Promise<SuggestVerificationStatusOutput> {
  return suggestVerificationStatusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestVerificationStatusPrompt',
  input: {schema: SuggestVerificationStatusInputSchema},
  output: {schema: SuggestVerificationStatusOutputSchema},
  prompt: `You are an AI assistant that helps verify mortgage documents.

  Analyze the following documents to determine if the NOI request should be verified or rejected.
  Explain your reasoning.

  Title Deed: {{media url=titleDeedDataUri}}
  Loan Letter: {{media url=loanLetterDataUri}}
  Proof Documents: {{media url=proofDocsDataUri}}

  Based on the document analysis, suggest a verification status (Verified or Rejected) and explain the reason for the suggestion.
  `,
});

const suggestVerificationStatusFlow = ai.defineFlow(
  {
    name: 'suggestVerificationStatusFlow',
    inputSchema: SuggestVerificationStatusInputSchema,
    outputSchema: SuggestVerificationStatusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
