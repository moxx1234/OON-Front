

const Indicator = ({ value, unit, name }) => {
	return (
		<div className="tw-text-[#222] tw-font-bold tw-flex tw-flex-col tw-items-end tw-mb-2">
			<p className="tw-text-4xl tw-capitalize">
				{value}
				{unit && <span className="tw-text-base tw-font-normal tw-ml-2 tw-normal-case">/{unit}</span>}
			</p>
			<p className="tw-uppercase">{name}</p>
		</div>
	)
}

export default Indicator