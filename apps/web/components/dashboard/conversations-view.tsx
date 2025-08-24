import Image from 'next/image'

export const ConversationsView = () => {
	return (
		<div className="flex h-full flex-1 flex-col gap-y-4 bg-muted">
			<div className="flex flex-1 items-center justify-center gap-x-2">
				<Image src="/logo.svg" height={40} width={40} alt="Logo" />
				<p className="font-semibold text-lg">Echo</p>
			</div>
		</div>
	)
}
