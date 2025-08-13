import React from 'react'

import { AuthLayout } from '@/components/auth/auth-layout'

export default function Layout({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	return <AuthLayout>{children}</AuthLayout>
}
