'use client'

import { useAtomValue } from 'jotai'

import { screenAtom } from '@/atoms/widget-atoms'
import { WidgetAuthScreen } from '@/components/screen/widget-auth-screen'
import { WidgetChatScreen } from '@/components/screen/widget-chat-screen'
import { WidgetErrorScreen } from '@/components/screen/widget-error-screen'
import { WidgetInboxScreen } from '@/components/screen/widget-inbox-screen'
import { WidgetLoadingScreen } from '@/components/screen/widget-loading-screen'
import { WidgetSelectionScreen } from '@/components/screen/widget-selection-screen'
import { WidgetVoiceScreen } from '@/components/screen/widget-voice-screen'

interface Props {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	const screen = useAtomValue(screenAtom)

	const screenComponents = {
		error: <WidgetErrorScreen />,
		loading: <WidgetLoadingScreen organizationId={organizationId} />,
		auth: <WidgetAuthScreen />,
		voice: <WidgetVoiceScreen />,
		inbox: <WidgetInboxScreen />,
		selection: <WidgetSelectionScreen />,
		chat: <WidgetChatScreen />,
		contact: <p>TODO</p>,
	}

	return (
		<main className="min-h-screen flex size-full flex-col overflow-hidden rounded-xl border bg-muted">
			{screenComponents[screen]}
		</main>
	)
}
