'use client'

import { useAtomValue } from 'jotai'

import { screenAtom } from '@/atoms/widget-atoms'
import { WidgetAuthScreen } from '@/components/screen/widget-auth-screen'
import { WidgetErrorScreen } from '@/components/screen/widget-error-screen'
import { WidgetLoadingScreen } from '@/components/screen/widget-loading-screen'

interface Props {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	const screen = useAtomValue(screenAtom)

	const screenComponents = {
		error: <WidgetErrorScreen organizationId={organizationId} />,
		loading: <WidgetLoadingScreen organizationId={organizationId} />,
		auth: <WidgetAuthScreen />,
		voice: <p>TODO</p>,
		inbox: <p>TODO</p>,
		selection: <p>TODO</p>,
		chat: <p>TODO</p>,
		contact: <p>TODO</p>,
	}

	return (
		<main className="min-h-screen flex size-full flex-col overflow-hidden rounded-xl border bg-muted">
			{screenComponents[screen]}
		</main>
	)
}
