'use client'

import { use } from 'react'

import { WidgetView } from '@/components/widget/widget-view'

interface Props {
	searchParams: Promise<{
		organizationId: string
	}>
}

export default function Page({ searchParams }: Props) {
	const { organizationId } = use(searchParams)

	return <WidgetView organizationId={organizationId} />
}
