'use client'

import React from 'react'

import { SignIn } from '@clerk/nextjs'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { Loader2 } from 'lucide-react'

import { AuthLayout } from '@/components/auth/auth-layout'

export const AuthGuard = ({
	children,
}: {
	children: Readonly<React.ReactNode>
}) => {
	return (
		<>
			<AuthLoading>
				<AuthLayout>
					<Loader2 className="animate-spin size-5" />
				</AuthLayout>
			</AuthLoading>
			<Authenticated>{children}</Authenticated>
			<Unauthenticated>
				<AuthLayout>
					<SignIn routing="hash" />
				</AuthLayout>
			</Unauthenticated>
		</>
	)
}
