import { createOpenAI } from '@ai-sdk/openai'
import { Agent } from '@convex-dev/agent'

import { components } from '../../../_generated/api'
import { SUPPORT_AGENT_PROMPT } from '../constants'
import { escalateConversation } from '../tools/escalateConversation'
import { resolveConversation } from '../tools/resolveConversation'

export const supportAgent = new Agent(components.agent, {
	name: 'Support Agent',
	languageModel: createOpenAI({
		baseURL: 'https://openrouter.ai/api/v1',
	}).chat('gpt-4o-mini'),
	instructions: SUPPORT_AGENT_PROMPT,
	tools: {
		resolveConversation,
		escalateConversation,
	},
})
