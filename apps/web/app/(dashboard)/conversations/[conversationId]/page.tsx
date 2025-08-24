import { Id } from '@workspace/backend/convex/_generated/dataModel'

import { ConversationIdView } from '@/components/dashboard/conversation-id-view'

export default async function Page({
	params,
}: {
	params: Promise<{
		conversationId: string
	}>
}) {
	const { conversationId } = await params

	return (
		<ConversationIdView
			conversationId={conversationId as Id<'conversations'>}
		/>
	)
}
