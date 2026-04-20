type BoxProps = React.HTMLAttributes<HTMLDivElement>;

const Box = ({ className = "", ...props }: BoxProps) => {
  return <div className={`relative ${className}`} {...props} />;
};

export default Box
