import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import info from '../../../assets/icons/info.svg'
import success from '../../../assets/icons/success.svg'
import BackVisual from './BackVisual'
import FrontVisual from './FrontVisual'

const stageDuration = 5000
const totalStages = { front: 6, back: 6 }

const ScanVisual = ({ scenario, message, isPlaced, isScanning, onSideChange, onPause, shouldRestart, onRestart }) => {
	const [scanStatus, setScanStatus] = useState({ side: 'front', stage: 0 })
	const [intervalId, setIntervalId] = useState(0)
	const navigate = useNavigate()

	// Navigation depending on chosen scenario
	useEffect(() => {
		if (scanStatus.stage < totalStages[scanStatus.side]) return

		if (scenario === 'only_front') navigate(-1)
		else if (scenario === 'front_and_back' && scanStatus.side === 'front') {
			setScanStatus({ side: 'back', stage: 0 })
			stopVisualProcess()
			onSideChange()
		}
		else navigate(-1)
	}, [scanStatus, scenario, navigate])

	// Stage changes flow
	useEffect(() => {
		if (isScanning) {
			const interval = setInterval(() => {
				setScanStatus(prevStatus => ({ ...prevStatus, stage: prevStatus.stage + 1 }))
				onPause()
			}, stageDuration)
			setIntervalId(interval)
		}
		else stopVisualProcess()

		// Clear interval on unmount
		return () => stopVisualProcess()
	}, [isScanning])

	useEffect(() => {
		if (!shouldRestart) return
		setScanStatus(prevStatus => ({ ...prevStatus, stage: 0 }))
		onRestart()
	}, [shouldRestart])

	const stopVisualProcess = () => {
		clearInterval(intervalId)
	}

	return (
		<div className='tw-flex tw-flex-col tw-gap-3 tw-flex-1'>
			{
				scanStatus.side === 'front' ? <FrontVisual
					stage={scanStatus.stage}
					totalStages={totalStages.front}
				/> : <BackVisual
					stage={scanStatus.stage}
					totalStages={totalStages.back}
				/>
			}
			<div className='tw-bg-white tw-rounded-3xl tw-border tw-border-[#09101D] tw-p-4 tw-flex tw-justify-center tw-items-center tw-gap-[10px]'>
				<div className='tw-relative tw-h-full tw-w-5'>
					{isPlaced ? <img src={success} alt='success icon' className='tw-absolute tw-w-full tw-h-full' /> : <img src={info} alt='info icon' className='tw-absolute tw-w-full tw-h-full' />}
				</div>
				<p className='tw-font-semibold'>{message || `Place the device on position ${scanStatus.stage + 1} and start`}</p>
			</div>
		</div>
	)
}

export default ScanVisual