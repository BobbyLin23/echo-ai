import { createOpenAI } from '@ai-sdk/openai'
import { createTool } from '@convex-dev/agent'
import { generateText } from 'ai'
import { z } from 'zod/v3'

import { internal } from '../../../_generated/api'
import { supportAgent } from '../agents/supportAgent'
import { SEARCH_INTERPRETER_PROMPT } from '../constants'
import rag from '../rag'

export const search = createTool({
	description:
		'Search the knowledge base for relevant information to help answer user questions',
	args: z.object({
		query: z.string().describe('The search query to find relevant information'),
	}),
	handler: async (ctx, args) => {
		if (!ctx.threadId) {
			return 'Missing thread ID'
		}

		const conversation = await ctx.runQuery(
			internal.system.conversations.getByThreadId,
			{
				threadId: ctx.threadId,
			},
		)

		if (!conversation) {
			return 'Conversation not found'
		}

		const orgId = conversation.organizationId

		const searchResult = await rag.search(ctx, {
			namespace: orgId,
			query: args.query,
			limit: 5,
		})

		const contextText = `Found result in ${searchResult.entries
			.map((e) => e.title || null)
			.filter((t) => t !== null)
			.join(', ')}. Here is the context:\n\n${searchResult.text}`

		const response = await generateText({
			messages: [
				{
					role: 'assistant',
					content: SEARCH_INTERPRETER_PROMPT,
				},
				{
					role: 'user',
					content: `User asked: "${args.query}"\n\nSearch results: ${contextText}`,
				},
			],
			model: createOpenAI({
				baseURL: 'https://openrouter.ai/api/v1',
			}).chat('gpt-4o-mini'),
		})

		await supportAgent.saveMessage(ctx, {
			threadId: ctx.threadId,
			message: {
				role: 'assistant',
				content: response.text,
			},
		})

		return response.text
	},
})
