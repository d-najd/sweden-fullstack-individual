import { cn } from "@/lib/utils"

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

function Row({ children, className, ...rest }: RowProps) {
	return (
		<div className={cn(`flex flex-row`, className)} {...rest}>
			{children}
		</div>
	)
}

export default Row
