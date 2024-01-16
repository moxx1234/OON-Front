import { Link } from "react-router-dom"

const MenuItem = ({ id, icon, title, description, onClick }) => {

	return (
		<Link
			to={id}
			id={id}
			className="tw-bg-gradient-to-r tw-from-white tw-to-[#EFF8FF] tw-rounded-3xl tw-p-6 tw-flex tw-items-center tw-gap-6"
			onClick={onClick && onClick}
		>
			<img src={icon.path} alt={icon.alt} className="tw-w-20 tw-h-20" />
			<div>
				<p className="tw-uppercase tw-font-semibold tw-text-xl">{title}</p>
				<p>{description}</p>
			</div>
		</Link>
	)
}

export default MenuItem