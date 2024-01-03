import Indicator from "./Indicator"

const AnimatedLine = ({ img }) => {
	return (
		<div className=" w-full h-full overflow-hidden">
			<div className="animation-line h-full" style={{ backgroundImage: `url(.${img})` }}></div>
		</div>
	)
}

const FaceStatsItem = ({ value, unit, name, lineImg = null, animComponent = null }) => {

	return (
		<div className="flex gap-3">
			<div className="flex-1">
				{lineImg && <AnimatedLine img={lineImg} />}
				{!!animComponent && animComponent}
			</div>
			<div>
				<Indicator value={value || '-/-'} unit={unit} name={name} />
			</div>
		</div>
	)
}

export default FaceStatsItem