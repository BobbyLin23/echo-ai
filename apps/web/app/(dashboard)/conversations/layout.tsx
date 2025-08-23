import React from 'react'

import { ConversationsLayout } from '@/components/dashboard/conversations-layout'

export default function Layout({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return <ConversationsLayout>{children}</ConversationsLayout>
}
