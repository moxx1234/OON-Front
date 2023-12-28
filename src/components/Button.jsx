
const Button = ({ type, text, className, ...props }) => {
	return (
		<button className={`${type}-button uppercase ${className}`} {...props}>{text}</button>
	)
}

export default Button