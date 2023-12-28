

const Indicator = ({ value, unit, name }) => {
	return (
		<div className="text-[#222] font-bold flex flex-col items-end mb-2">
			<p className="text-4xl capitalize">
				{value}
				{unit && <span className="text-base font-normal ml-2 normal-case">/{unit}</span>}
			</p>
			<p className="uppercase">{name}</p>
		</div>
	)
}

export default Indicator