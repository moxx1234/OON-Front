import wave from '../../../assets/icons/wave.svg'
import cardio from '../../../assets/icons/cardio.svg'
import FaceStatsItem from './FaceStatsItem'
import SemiCircle from './SemiCircle'

const energyLevels = ['low', 'medium', 'high']

const FaceStats = ({ data }) => {
	const { heart_rate, breath_rate, energy_meter } = data
	return (
		<>
			<FaceStatsItem value={heart_rate} unit='min' name='heart rate' lineImg={cardio} />
			<FaceStatsItem value={breath_rate} unit='min' name='breath rate' lineImg={wave} />
			<FaceStatsItem value={energyLevels[energy_meter]} name='energy meter' animComponent={<SemiCircle value={energy_meter} />} />
		</>
	)
}

export default FaceStats