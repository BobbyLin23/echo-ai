'use client'

import { WidgetAuthScreen } from '@/components/widget/widget-auth-screen'

interface Props {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	return (
		<main className="min-h-screen flex size-full flex-col overflow-hidden rounded-xl border bg-muted">
			<WidgetAuthScreen />
		</main>
	)
}
