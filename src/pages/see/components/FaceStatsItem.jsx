import Indicator from "./Indicator"

const AnimatedLine = ({ img }) => {
	return (
		<div className=" tw-w-full tw-h-full tw-overflow-hidden">
			<div className="animation-line tw-h-full" style={{ backgroundImage: `url(.${img})` }}></div>
		</div>
	)
}

const FaceStatsItem = ({ value, unit, name, lineImg = null, animComponent = null }) => {

	return (
		<div className="tw-flex tw-gap-3">
			<div className="tw-flex-1">
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