import { createOpenAI } from '@ai-sdk/openai'
import { Agent } from '@convex-dev/agent'

import { components } from '../../../_generated/api'

export const supportAgent = new Agent(components.agent, {
	name: 'Support Agent',
	languageModel: createOpenAI({
		baseURL: 'https://openrouter.ai/api/v1',
	}).chat('gpt-4o-mini'),
})
