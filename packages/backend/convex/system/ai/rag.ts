import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { RAG } from '@convex-dev/rag'

import { components } from '../../_generated/api'

const rag = new RAG(components.rag, {
	embeddingDimension: 1536,
	textEmbeddingModel: createOpenAICompatible({
		name: 'Qwen/Qwen3-Embedding-0.6B',
		apiKey: process.env.QWEN_API_KEY,
		baseURL: 'https://api.siliconflow.cn/v1',
		includeUsage: true,
	}).textEmbeddingModel('Qwen/Qwen3-Embedding-0.6B'),
})

export default rag
