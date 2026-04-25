import { cn } from "@/lib/utils"

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

function Column({ children, className, ...rest }: ColumnProps) {
	return (
		<div className={cn(`flex flex-col`, className)} {...rest}>
			{children}
		</div>
	)
}

export default Column
