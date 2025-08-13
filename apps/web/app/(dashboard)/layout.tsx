import React from 'react'

import { cookies } from 'next/headers'

import {
	SIDEBAR_COOKIE_NAME,
	SidebarProvider,
} from '@workspace/ui/components/sidebar'

import { AuthGuard } from '@/components/auth/auth-guard'
import { OrganizationGuard } from '@/components/auth/organization-guard'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

export default async function Layout({
	children,
}: {
	children: Readonly<React.ReactNode>
}) {
	const cookieStore = await cookies()

	const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === 'true'

	return (
		<AuthGuard>
			<OrganizationGuard>
				<SidebarProvider defaultOpen={defaultOpen}>
					<DashboardSidebar />
					<main className="flex-1 flex flex-col">{children}</main>
				</SidebarProvider>
			</OrganizationGuard>
		</AuthGuard>
	)
}
