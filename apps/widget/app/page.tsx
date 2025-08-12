'use client'

import { Button } from '@workspace/ui/components/button'

import { useVapi } from '@/features/widget/hooks/use-vapi'

export default function Page() {
	const {
		startCall,
		endCall,
		isConnected,
		isSpeaking,
		isConnecting,
		transcript,
	} = useVapi()

	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold">Hello World</h1>
				<Button size="sm" onClick={() => startCall()}>
					Start Call
				</Button>
				<Button size="sm" variant="destructive" onClick={() => endCall()}>
					End Call
				</Button>
				<p>isConnected: {isConnected}</p>
				<p>isConnecting: {isConnecting}</p>
				<p>isSpeaking: {isSpeaking}</p>
				<p>{JSON.stringify(transcript, null, 2)}</p>
			</div>
		</div>
	)
}
