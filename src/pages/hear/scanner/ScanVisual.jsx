import { useContext } from 'react'
import info from '../../../assets/icons/info.svg'
import success from '../../../assets/icons/success.svg'
import { ScanContext } from '../context/ScannerProvider'
import BackVisual from './BackVisual'
import FrontVisual from './FrontVisual'

const ScanVisual = ({ message, isPlaced }) => {
	const { status } = useContext(ScanContext)

	return (
		<div className='tw-flex tw-flex-col tw-gap-3 tw-flex-1'>
			{
				status.side === 'front' ? <FrontVisual
					stage={status.stage}
					totalStages={status.totalStages.front}
				/> : <BackVisual
					stage={status.stage}
					totalStages={status.totalStages.back}
				/>
			}
			<div className='tw-bg-white tw-rounded-3xl tw-border tw-border-[#09101D] tw-p-4 tw-flex tw-justify-center tw-items-center tw-gap-[10px]'>
				<div className='tw-relative tw-h-full tw-w-5'>
					{isPlaced ? <img src={success} alt='success icon' className='tw-absolute tw-w-full tw-h-full' /> : <img src={info} alt='info icon' className='tw-absolute tw-w-full tw-h-full' />}
				</div>
				<p className='tw-font-semibold'>{message || `Place the device on position ${status.stage + 1} and start`}</p>
			</div>
		</div>
	)
}

export default ScanVisual