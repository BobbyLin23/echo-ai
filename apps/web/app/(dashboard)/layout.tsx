import React from 'react'

import { AuthGuard } from '@/features/auth/components/auth-guard'
import { OrganizationGuard } from '@/features/auth/components/organization-guard'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AuthGuard>
			<OrganizationGuard>{children}</OrganizationGuard>
		</AuthGuard>
	)
}
