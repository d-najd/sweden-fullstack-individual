interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

function Column({ children, ...rest }: ColumnProps) {
	return (
		<div className={`flex flex-col`} {...rest}>
			{children}
		</div>
	)
}

export default Column
