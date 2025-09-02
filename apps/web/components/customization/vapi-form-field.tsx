import { UseFormReturn } from 'react-hook-form'

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@workspace/ui/components/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@workspace/ui/components/select'

import { useVapiAssistants, useVapiPhoneNumbers } from '@/hooks/use-vapi-data'

import { FormSchema } from './form'

interface VapiFormFieldProps {
	form: UseFormReturn<FormSchema>
}

export const VapiFormField = ({ form }: VapiFormFieldProps) => {
	const { data: phoneNumbers, isLoading: phoneNumbersLoading } =
		useVapiPhoneNumbers()
	const { data: assistants, isLoading: assistantsLoading } = useVapiAssistants()

	const disabled = form.formState.isSubmitting

	return (
		<>
			<FormField
				control={form.control}
				name="vapiSettings.assistantId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Voice Assistant</FormLabel>
						<Select
							value={field.value}
							disabled={assistantsLoading || disabled}
							onValueChange={field.onChange}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue
										placeholder={
											assistantsLoading
												? 'Loading assistants...'
												: 'Select an assistant'
										}
									/>
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="none">None</SelectItem>
								{assistants?.map((assistant) => (
									<SelectItem key={assistant.id} value={assistant.id}>
										{assistant.name || 'Unnamed Assistant'} -{' '}
										{assistant.model?.model || 'Unknown Model'}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormDescription>
							The Vapi assistant to use for voice calls.
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="vapiSettings.phoneNumber"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Display Phone Number</FormLabel>
						<Select
							value={field.value}
							disabled={phoneNumbersLoading || disabled}
							onValueChange={field.onChange}
						>
							<FormControl>
								<SelectTrigger>
									<SelectValue
										placeholder={
											phoneNumbersLoading
												? 'Loading phone numbers...'
												: 'Select a phone number'
										}
									/>
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="none">None</SelectItem>
								{phoneNumbers?.map((phone) => (
									<SelectItem key={phone.id} value={phone.id}>
										{phone.number || 'Unknown'} - {phone.name || 'Unnamed'}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormDescription>
							Phone number to display in the widget.
						</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
