'use client'

import React from 'react'

import { SignIn } from '@clerk/nextjs'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'

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
					<p>Loading...</p>
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
