'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@workspace/backend/_generated/api'
import { Doc } from '@workspace/backend/_generated/dataModel'
import { Button } from '@workspace/ui/components/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { useMutation } from 'convex/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { z } from 'zod/v3'

import {
	contactSessionIdAtomFamily,
	organizationIdAtom,
} from '@/atoms/widget-atoms'
import { WidgetHeader } from '@/components/widget/widget-header'

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Email is required'),
})

export const WidgetAuthScreen = () => {
	const organizationId = useAtomValue(organizationIdAtom)

	const setContactSessionId = useSetAtom(
		contactSessionIdAtomFamily(organizationId || ''),
	)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
		},
	})

	const createContactSession = useMutation(api.public.contactSession.create)

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		if (!organizationId) {
			return
		}

		const metadata: Doc<'contactSessions'>['metadata'] = {
			userAgent: navigator.userAgent,
			language: navigator.language,
			languages: navigator.languages.join(','),
			platform: navigator.platform,
			vendor: navigator.vendor,
			screenResolution: `${screen.width}x${screen.height}`,
			viewportSize: `${window.innerWidth}x${window.innerHeight}`,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			timezoneOffset: new Date().getTimezoneOffset(),
			cookieEnabled: navigator.cookieEnabled,
			referer: document.referrer || 'direct',
			currentUrl: window.location.href,
		}

		const contactSessionId = await createContactSession({
			...values,
			metadata,
			organizationId,
		})

		setContactSessionId(contactSessionId)
	}

	return (
		<>
			<WidgetHeader>
				<div className="flex flex-col justify-between gap-y-2 px-2 py-6">
					<p className="text-3xl">Hi there!👋</p>
					<p className="text-lg">Let&apos; get started</p>
				</div>
			</WidgetHeader>
			<Form {...form}>
				<form
					className="flex flex-1 flex-col gap-y-4 p-4"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className="h-10 bg-background"
										placeholder="e.g. John Doe"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						name="name"
					/>
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										className="h-10 bg-background"
										placeholder="e.g. john.doe@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						name="email"
					/>
					<Button
						disabled={form.formState.isSubmitting}
						size="lg"
						type="submit"
					>
						Continue
					</Button>
				</form>
			</Form>
		</>
	)
}
