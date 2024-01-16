
const Button = ({ style, text, className, ...props }) => {
	// style: 'confirm' || 'dismiss'
	return (
		<button className={`${style}-button tw-uppercase ${className}`} {...props}>{text}</button>
	)
}

export default Button