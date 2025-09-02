import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@workspace/backend/convex/_generated/api'
import { Doc } from '@workspace/backend/convex/_generated/dataModel'
import { Button } from '@workspace/ui/components/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@workspace/ui/components/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@workspace/ui/components/form'
import { Separator } from '@workspace/ui/components/separator'
import { Textarea } from '@workspace/ui/components/textarea'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import z from 'zod'

import { VapiFormField } from './vapi-form-field'

interface CustomizationFormProps {
	initialValues?: WidgetSettings | null
	hasVapiPlugin: boolean
}

export const widgetSettingsSchema = z.object({
	greetMessage: z.string().min(1, 'Greeting message is required'),
	defaultSuggestions: z.object({
		suggestion1: z.string().optional(),
		suggestion2: z.string().optional(),
		suggestion3: z.string().optional(),
	}),
	vapiSettings: z.object({
		assistantId: z.string().optional(),
		phoneNumber: z.string().optional(),
	}),
})

type WidgetSettings = Doc<'widgetSettings'>
export type FormSchema = z.infer<typeof widgetSettingsSchema>

export const CustomizationForm = ({
	initialValues,
	hasVapiPlugin,
}: CustomizationFormProps) => {
	const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert)

	const form = useForm<FormSchema>({
		defaultValues: {
			greetMessage:
				initialValues?.greetMessage || 'Hi! How can I help you today?',
			defaultSuggestions: {
				suggestion1: initialValues?.defaultSuggestions?.suggestion1 || '',
				suggestion2: initialValues?.defaultSuggestions?.suggestion2 || '',
				suggestion3: initialValues?.defaultSuggestions?.suggestion3 || '',
			},
			vapiSettings: {
				assistantId: initialValues?.vapiSettings?.assistantId || '',
				phoneNumber: initialValues?.vapiSettings?.phoneNumber || '',
			},
		},
		resolver: zodResolver(widgetSettingsSchema),
	})

	const onSubmit = async (values: FormSchema) => {
		try {
			const vapiSettings: WidgetSettings['vapiSettings'] = {
				assistantId:
					values.vapiSettings.assistantId === 'none'
						? ''
						: values.vapiSettings.assistantId,
				phoneNumber:
					values.vapiSettings.phoneNumber === 'none'
						? ''
						: values.vapiSettings.phoneNumber,
			}

			await upsertWidgetSettings({
				greetMessage: values.greetMessage,
				defaultSuggestions: values.defaultSuggestions,
				vapiSettings,
			})

			toast.success('Widget settings saved')
		} catch (error) {
			console.error('Failed to save widget settings', error)
			toast.error('Something went wrong')
		}
	}

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>General Chat Settings</CardTitle>
						<CardDescription>
							Configure the general settings for your chat widget.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<FormField
							control={form.control}
							name="greetMessage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Greeting Message</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Welcome message shown when chat open"
											rows={3}
										/>
									</FormControl>
									<FormDescription>
										The first message your customers will see when they open the
										chat.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Separator />

						<div className="space-y-4">
							<div>
								<h3 className="mb-4 text-sm">Default Suggestions</h3>
								<p className="mb-4 text-muted-foreground text-sm">
									Quick reply suggestions shown to customers to help guide the
									conversation.
								</p>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="defaultSuggestions.suggestion1"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Suggestion 1</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="e.g., How do I get started?"
														rows={3}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="defaultSuggestions.suggestion2"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Suggestion 2</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="e.g., What are your pricing plans?"
														rows={3}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="defaultSuggestions.suggestion3"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Suggestion 3</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder="e.g., I need help with my account?"
														rows={3}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				{hasVapiPlugin && (
					<Card>
						<CardHeader>
							<CardTitle>Voice Assistant Settings</CardTitle>
							<CardDescription>
								Configure the general settings for your voice assistant.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<VapiFormField form={form} />
						</CardContent>
					</Card>
				)}

				<div className="flex justify-end">
					<Button disabled={form.formState.isSubmitting} type="submit">
						Save Changes
					</Button>
				</div>
			</form>
		</Form>
	)
}
