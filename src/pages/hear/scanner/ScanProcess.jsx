import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import CenteredWrapper from '../components/CenteredWrapper'
import ScannerProvider from '../context/ScannerProvider'
import HeartRate from './HeartRate'
import ScanControls from './ScanControls'
import ScanHelper from './ScanHelper'
import ScanInstruction from './ScanInstruction'
import ScanVisual from './ScanVisual'
import AdjustableGraph from './graphs/AdjustableGraph'
import WavyGraph from './graphs/WavyGraph'
import Gyro from './gyro/Gyro'

const ScanProcess = ({ scenario }) => {
	const navigate = useNavigate()
	const [isRead, setIsRead] = useState(false)

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				layout
				transition={{ duration: 0.15 }}
				key={isRead}
				className='tw-flex-1 tw-flex tw-justify-center tw-items-center tw-px-8 tw-mt-2'
			>
				<ScannerProvider scenario={scenario}>
					{!isRead ? (
						<CenteredWrapper animDuration={0.15}>
							<ScanInstruction scenario={scenario} onRead={() => setIsRead(true)} onDismiss={() => navigate(-1)} />
						</CenteredWrapper>
					) : (
						<div className=' tw-max-w-[1440px] tw-flex tw-gap-6 tw-flex-1'>
							<div className='tw-basis-1/3 tw-flex tw-flex-col tw-gap-6'>
								<div className='tw-p-6 tw-flex tw-flex-col tw-gap-8 tw-rounded-3xl tw-bg-[rgba(255,255,255,0.70)]'>
									<WavyGraph name="audible_inaudible" title='Audible and inaudible sound collected from body' />
									<WavyGraph name="infrasound" title='Infrasound (novel data)' />
									<WavyGraph name="electronic_stethoscope" title='Typical electronic stethoscope' />
								</div>
								<div className='tw-p-6 tw-flex tw-flex-col tw-gap-4 tw-rounded-3xl tw-bg-[rgba(255,255,255,0.70)]'>
									<AdjustableGraph title='Frequency versus time' />
								</div>
							</div>
							<div className='tw-basis-1/3'>
								<div className='tw-flex tw-flex-col tw-gap-6 tw-h-[87%]'>
									<ScanVisual />
									<ScanControls />
								</div>
							</div>
							<div className='tw-basis-1/3 tw-flex tw-flex-col tw-gap-4'>
								<Gyro />
								<HeartRate />
								<div className='tw-flex tw-flex-1 tw-p-6 tw-rounded-3xl tw-bg-gradient-to-l tw-from-[rgba(239,248,255,0.70)] tw-from-[10.38%] tw-to-[rgba(255,255,255,0.63)] tw-to-[94.42%]'>
									<ScanHelper />
								</div>
							</div>
						</div>
					)}
				</ScannerProvider>
			</motion.div>
		</AnimatePresence>

	)
}

export default ScanProcess