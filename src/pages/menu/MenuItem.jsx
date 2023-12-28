import { Link } from "react-router-dom"

const MenuItem = ({ id, icon, title, description, onClick }) => {

	return (
		<Link
			to={id}
			id={id}
			className="bg-gradient-to-r from-white to-[#EFF8FF] rounded-3xl p-6 flex items-center gap-6"
			onClick={onClick && onClick}
		>
			<img src={icon.path} alt={icon.alt} className="w-20 h-20" />
			<div>
				<p className="uppercase font-semibold text-xl">{title}</p>
				<p>{description}</p>
			</div>
		</Link>
	)
}

export default MenuItem