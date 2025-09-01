'use client'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@workspace/ui/components/tooltip'

interface HintProps {
	children: React.ReactNode
	text: string
	side?: 'top' | 'bottom' | 'right' | 'left'
	align?: 'start' | 'end' | 'center'
}

export const Hint = ({
	children,
	text,
	side = 'top',
	align = 'center',
}: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent align={align} side={side}>
					<p>{text}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
