'use client'

import { api } from '@workspace/backend/_generated/api'
import { Button } from '@workspace/ui/components/button'
import { useQuery } from 'convex/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { ArrowLeftIcon, MenuIcon } from 'lucide-react'

import {
	contactSessionIdAtomFamily,
	conversationIdAtom,
	organizationIdAtom,
	screenAtom,
} from '@/atoms/widget-atoms'
import { WidgetHeader } from '@/components/widget/widget-header'

export const WidgetChatScreen = () => {
	const setScreen = useSetAtom(screenAtom)
	const setConversationId = useSetAtom(conversationIdAtom)

	const conversationId = useAtomValue(conversationIdAtom)
	const organizationId = useAtomValue(organizationIdAtom)
	const contactSessionId = useAtomValue(
		contactSessionIdAtomFamily(organizationId || ''),
	)

	const onBack = () => {
		setConversationId(null)
		setScreen('selection')
	}

	const conversation = useQuery(
		api.public.conversations.getOne,
		conversationId && contactSessionId
			? {
					conversationId,
					contactSessionId,
				}
			: 'skip',
	)

	return (
		<>
			<WidgetHeader className="flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<Button onClick={onBack} size="icon" variant="transparent">
						<ArrowLeftIcon />
					</Button>
					<p>Chat</p>
				</div>
				<Button variant="transparent" size="icon">
					<MenuIcon />
				</Button>
			</WidgetHeader>
			<div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4"></div>
		</>
	)
}
