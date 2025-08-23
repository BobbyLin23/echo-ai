import { cn } from '@workspace/ui/lib/utils'
import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from 'lucide-react'

interface ConversationStatusIconProps {
	status: 'unresolved' | 'resolved' | 'escalated'
	className?: string
}

const statusConfig = {
	resolved: {
		icon: CheckIcon,
		bgColor: 'bg-[#3FB62F]',
	},
	unresolved: {
		icon: ArrowRightIcon,
		bgColor: 'bg-destructive',
	},
	escalated: {
		icon: ArrowUpIcon,
		bgColor: 'bg-yellow-500',
	},
} as const

export const ConversationStatusIcon = ({
	status,
	className,
}: ConversationStatusIconProps) => {
	const config = statusConfig[status]
	const Icon = statusConfig[status].icon

	return (
		<div
			className={cn(
				'flex items-center justify-center rounded-full size-5',
				config.bgColor,
				className,
			)}
		>
			<Icon className="size-3 stroke-3 text-white" />
		</div>
	)
}
