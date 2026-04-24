interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
}

function Row({ children, ...rest }: RowProps) {
	return (
		<div className={`flex flex-row`} {...rest}>
			{children}
		</div>
	)
}

export default Row
