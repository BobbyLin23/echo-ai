import { createOpenAI } from '@ai-sdk/openai'
import { Agent } from '@convex-dev/agent'

import { components } from '../../../_generated/api'
import { escalateConversation } from '../tools/escalateConversation'
import { resolveConversation } from '../tools/resolveConversation'

export const supportAgent = new Agent(components.agent, {
	name: 'Support Agent',
	languageModel: createOpenAI({
		baseURL: 'https://openrouter.ai/api/v1',
	}).chat('gpt-4o-mini'),
	instructions: `You are a customer support agent. Use "resolveConversation" tool when user expresses finalization of the conversation. Use "escalateConversation" tool
	when user expresses frustration, or request a human explicitly.`,
	tools: {
		resolveConversation,
		escalateConversation,
	},
})
