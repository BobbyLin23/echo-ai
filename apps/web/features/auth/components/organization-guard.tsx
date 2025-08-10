'use client'

import React from 'react'

import { useOrganization } from '@clerk/nextjs'

import { AuthLayout } from '@/features/auth/components/auth-layout'
import { OrgSelectView } from '@/features/auth/components/org-select-view'

export const OrganizationGuard = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { organization } = useOrganization()

	if (!organization) {
		return (
			<AuthLayout>
				<OrgSelectView />
			</AuthLayout>
		)
	}

	return <>{children}</>
}
