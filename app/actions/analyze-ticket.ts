"use server"

import { Priority } from "@/app/(app)/chat/_components/Priority"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()

const SYSTEM_PROMPT = `You are a ticketing system assistant that analyzes support tickets and assigns priority levels. Your task is to read a ticket's body and determine the appropriate priority level along with a clear explanation for your choice.

Your job is to assign one of the following priority levels to this ticket:

- **Alacsony** (Low): Minor issues, cosmetic problems, general questions, or requests that don't impact core functionality. Can be addressed in normal workflow.
- **Közepes** (Medium): Issues that affect functionality but have workarounds, feature requests that would improve user experience, or problems affecting a small number of users.
- **Magas** (High): Significant issues affecting multiple users or important functionality, problems without easy workarounds, or issues that impact business operations.
- **Kritikus** (Critical): System outages, security vulnerabilities, data loss issues, or problems that completely block critical business functions and affect many users.

When determining the priority, consider:
- The severity and scope of the issue
- How many users are affected
- Whether there are workarounds available
- The impact on business operations
- Time sensitivity of the request

In addition to selecting the final priority, simulate how an AI classification model would estimate the probability of each priority category. Provide probability scores between 0 and 1 for each priority. The probabilities should sum to approximately 1.

Provide your response in the following JSON format:

{
  "priority": "Alacsony" | "Közepes" | "Magas" | "Kritikus",
  "priorityLowProbability": number,
  "priorityMediumProbability": number,
  "priorityHighProbability": number,
  "priorityCriticalProbability": number,
  "message": "{{reason for choice}}"
}

Rules:
- The "priority" field must match the category with the highest probability.
- The "message" must explain the reasoning in **maximum 30 words**.
- The message must always be written in **Hungarian**.
- Probability values must be decimals between 0 and 1.`

export type TicketAnalysisResponse = {
  priority?: Priority
  priorityLowProbability?: number
  priorityMediumProbability?: number
  priorityHighProbability?: number
  priorityCriticalProbability?: number

  message: string
}

export async function analyzeTicket(input: string): Promise<TicketAnalysisResponse> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 256,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Here is the ticket body to analyze:\n\n<ticket_body>\n${input}\n</ticket_body>\n\nAnalyze this ticket and output your response in the exact JSON format specified.`,
      },
    ],
  })

  const textBlock = response.content.find((b) => b.type === "text")
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude")
  }

  console.log("Claude response:", textBlock.text)

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/)

  console.log("Extracted JSON:", jsonMatch)
  if (!jsonMatch) {
    throw new Error("Could not extract JSON from response")
  }

  return JSON.parse(jsonMatch[0]) as TicketAnalysisResponse
}
