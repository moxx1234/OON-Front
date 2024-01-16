import ProgressBar from 'react-bootstrap/ProgressBar'

const StageProgress = ({ stage }) => {
	const totalStages = 3
	const now = Math.round(100 / totalStages * stage)
	return (
		<>
			<p className='tw-uppercase tw-font-semibold tw-mb-3'>scan progress ({stage > totalStages ? totalStages : stage} of {totalStages})</p>
			<ProgressBar now={now} />
		</>
	)
}

export default StageProgress