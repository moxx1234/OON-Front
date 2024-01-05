import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { socket } from '../../api/machineVision'
import eye from '../../assets/icons/see.svg'
import Loader from '../../components/Loader'
import ProcessAborter from '../../components/ProcessAborter'
import VisualScanner from './components/VisualScanner'
import { useLocation, useNavigate } from 'react-router-dom'
import Result from './Result'
import ExitDialog from '../../components/ExitDialog'

const delay = 5

const MachineVision = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [scanStage, setScanStage] = useState(3)
	const [scanData, setScanData] = useState()
	const [landmarks, setLandmarks] = useState()
	const [mesh, setMesh] = useState()
	const [facemap, setFacemap] = useState()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		socket.connect()
		socket.emit('start_stream')
		socket.once('video_frame', () => { setIsLoading(false) })
		socket.on('data_response', data => {
			setScanData(data)
		})

		return () => {
			socket.off('data_response')
			socket.off('start_stream')
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		if (scanStage === 0 && location.state === 'finished') { return navigate('/', { state: null }) }
		if (scanStage <= 3) socket.emit('change_stage', { stage: scanStage })
		else {
			socket.emit('end_stream', { message: 'scan complete' })
			socket.disconnect()
			const canvas = document.getElementById('full-canvas')
			canvas.style.opacity = 0
			canvas.ontransitionend = () => navigate(location.pathname, { state: 'finished' })
		}
	}, [scanStage, location, navigate])

	useEffect(() => {
		if (scanData) {
			const { face_effect_landmarks, face_effect_facemap, face_effect_mesh, in_roi, qr_code_link, energy_meter } = scanData
			if (!in_roi) {
				setScanStage(0)
				return
			}
			setTimeout(() => {
				if (scanStage === 0 && in_roi) setScanStage(scanStage + 1)
				else if (scanStage === 1 && !!face_effect_landmarks) setScanStage(scanStage + 1)
				else if (scanStage === 2 && !!face_effect_facemap) setScanStage(scanStage + 1)
				else if (scanStage === 3 && !!face_effect_mesh && energy_meter !== null && !!qr_code_link) { setScanStage(scanStage + 1) }
			}, delay * 1000)

			setTimeout(() => {
				setFacemap(face_effect_facemap)
				setLandmarks(face_effect_landmarks)
				setMesh(face_effect_mesh)
			}, 1000)
		}
	}, [scanData, scanStage])

	const handleNavigate = () => {
		setIsModalOpen(true)
	}
	const handleConfirmNav = () => {
		navigate('/')
	}
	const handleCancelNav = () => {
		setIsModalOpen(false)
	}

	return (
		<AnimatePresence mode='wait'>
			{
				isLoading ?
					<Loader icon={eye} text='machine vision' status='complete!' key='loader' />
					: (
						<>
							<ExitDialog isOpen={isModalOpen} onConfirmNav={handleConfirmNav} onCancelNav={handleCancelNav} />
							<motion.div
								className='w-full h-full flex justify-center items-center'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: .8 }}
							>
								{location.state !== 'finished' ? (
									<>
										<div className='mask'></div>
										<ProcessAborter text='machine vision' onClick={handleNavigate} />
										<VisualScanner data={scanData} stage={scanStage} landmarks={landmarks} facemap={facemap} mesh={mesh} />
									</>
								) : (
									<Result qrUrl={scanData?.qr_code_link} />
								)}

							</motion.div>
						</>
					)
			}
		</AnimatePresence>
	)
}

export default MachineVision