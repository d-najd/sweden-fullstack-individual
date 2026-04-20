type DivProps = React.HTMLAttributes<HTMLDivElement>;

const Row = ({ className, ...props }: DivProps) => {
  return <div className={`flex flex-row ${className ?? ""}`} {...props} />;
};

export default Row
