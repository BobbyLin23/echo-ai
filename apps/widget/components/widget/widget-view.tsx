'use client'

import { useAtomValue } from 'jotai'

import { screenAtom } from '@/atoms/widget-atoms'
import { WidgetAuthScreen } from '@/components/widget/widget-auth-screen'

interface Props {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	const screen = useAtomValue(screenAtom)

	const screenComponents = {
		error: <p>TODO</p>,
		loading: <p>Loading...</p>,
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
