import wave from '../../../assets/icons/wave.svg'
import cardio from '../../../assets/icons/cardio.svg'
import FaceStatsItem from './FaceStatsItem'
import SemiCircle from './SemiCircle'
import { useEffect, useState } from 'react'

const FaceStats = ({ data }) => {
	const { heart_rate, breath_rate, energy_meter } = data
	const [energyText, setEnergyText] = useState('high')
	useEffect(() => {
		if (energy_meter <= 1) setEnergyText('high')
		else if (energy_meter > 1 && energy_meter <= 2) setEnergyText('medium')
		else setEnergyText('low')
	}, [energy_meter])
	return (
		<>
			<FaceStatsItem value={heart_rate} unit='min' name='heart rate' lineImg={cardio} />
			<FaceStatsItem value={breath_rate} unit='min' name='breath rate' lineImg={wave} />
			<FaceStatsItem value={energyText} name='energy meter' animComponent={<SemiCircle value={parseInt(energy_meter) + Math.round(energy_meter)} />} />
		</>
	)
}

export default FaceStats