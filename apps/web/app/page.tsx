'use client'

import {
	Authenticated,
	Unauthenticated,
	useMutation,
	useQuery,
} from 'convex/react'

import { api } from '@workspace/backend/convex/_generated/api'
import { Button } from '@workspace/ui/components/button'
import { SignInButton, UserButton } from '@clerk/nextjs'

export default function Page() {
	const users = useQuery(api.user.getMany)
	const addUser = useMutation(api.user.add)

	return (
		<>
			<Authenticated>
				<div className="flex min-h-svh flex-col items-center justify-center">
					<p>apps/web</p>
					<UserButton />
					<Button onClick={() => addUser()}>Add</Button>
					<div className="mx-auto w-full max-w-sm">
						{JSON.stringify(users, null, 2)}
					</div>
				</div>
			</Authenticated>
			<Unauthenticated>
				<p>Must be signed in!</p>
				<SignInButton>Sign in!</SignInButton>
			</Unauthenticated>
		</>
	)
}
