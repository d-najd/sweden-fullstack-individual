type DivProps = React.HTMLAttributes<HTMLDivElement>

const Column = ({ className, ...props }: DivProps) => {
	return <div className={`flex flex-col ${className ?? ""}`} {...props} />
}

export default Column
