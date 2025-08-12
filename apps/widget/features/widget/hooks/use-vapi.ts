import { useEffect, useState } from 'react'

import Vapi from '@vapi-ai/web'

interface TranscriptMessage {
	role: 'user' | 'assistant'
	text: string
}

export const useVapi = () => {
	const [vapi, setVapi] = useState<Vapi | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const [isConnecting, setIsConnecting] = useState(false)
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

	useEffect(() => {
		// Only for testing the Vapi API
		const vapiInstance = new Vapi('3003b85a-9ac4-4ded-acb8-cc63e99dfd30')

		setVapi(vapiInstance)

		vapiInstance.on('call-start', () => {
			setIsConnected(true)
			setIsConnecting(false)
			setTranscript([])
		})

		vapiInstance.on('call-end', () => {
			setIsConnected(false)
			setIsConnecting(false)
			setIsSpeaking(false)
		})

		vapiInstance.on('speech-start', () => {
			setIsSpeaking(true)
		})

		vapiInstance.on('error', (error) => {
			console.log('VAPI Error', error)
			setIsSpeaking(false)
		})

		vapiInstance.on('message', (message) => {
			if (message.type === 'transcript' && message.transcriptType === 'final') {
				setTranscript((prev) => [
					...prev,
					{
						role: message.role === 'user' ? 'user' : 'assistant',
						text: message.transcript,
					},
				])
			}
		})

		return () => {
			vapiInstance?.stop()
		}
	}, [])

	const startCall = () => {
		setIsConnecting(true)

		if (vapi) {
			vapi.start('ccb75a6f-b185-43c2-81c3-61ffba6b2a3d')
		}
	}

	const endCall = () => {
		if (vapi) {
			vapi.stop()
		}
	}

	return {
		startCall,
		endCall,
		isConnected,
		isSpeaking,
		isConnecting,
		transcript,
	}
}
