import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { socket } from '../../api/socket'
import eye from '../../assets/icons/see.svg'
import Loader from '../../components/Loader'
import ProcessAborter from '../../components/ProcessAborter'
import VisualScanner from './components/VisualScanner'
import { useLocation, useNavigate } from 'react-router-dom'
import Result from './Result'
import ExitDialog from '../../components/ExitDialog'
import Header from '../../components/Header'

const delay = 20

const MachineVision = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [scanStage, setScanStage] = useState(1)
	const [scanData, setScanData] = useState()
	const [landmarks, setLandmarks] = useState()
	const [mesh, setMesh] = useState()
	const [facemap, setFacemap] = useState()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		// socket connection
		socket.connect()
		socket.emit('start_stream')
		socket.once('video_frame', () => { setIsLoading(false) })
		socket.on('data_response', data => { setScanData(data) })

		return () => {
			socket.off('data_response')
			socket.off('start_stream')
			socket.disconnect()
		}
	}, [])

	useEffect(() => {
		// navigate to menu if user refreshed the page during scanning
		if (scanStage === 0 && location.state === 'finished') { return navigate('/', { state: null }) }

		// scan stage changes emitions
		if (scanStage <= 3) socket.emit('change_stage', { stage: scanStage })
		else {
			// ending of scanning proccess
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

			// restart the process if something is wrong with the face (from backend)
			if (!in_roi) { return setScanStage(0) }

			// timeout for visual scan stages progress (delay is global variable defined on top of the file)
			setTimeout(() => {
				if (scanStage === 0 && in_roi) setScanStage(scanStage + 1)
				else if (scanStage === 1 && !!face_effect_landmarks) setScanStage(scanStage + 1)
				else if (scanStage === 2 && !!face_effect_facemap) setScanStage(scanStage + 1)
				else if (scanStage === 3 && !!face_effect_mesh && energy_meter !== null && !!qr_code_link) { setScanStage(scanStage + 1) }
			}, delay * 1000)

			// delays for canvas drawing based on backend data
			setTimeout(() => {
				setFacemap(face_effect_facemap)
				setLandmarks(face_effect_landmarks)
				setMesh(face_effect_mesh)
			}, 1000)
		}
	}, [scanData, scanStage])

	// abort process handlers
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
						<motion.div
							className='tw-flex tw-flex-col tw-flex-1'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: .8 }}
						>
							<ExitDialog isOpen={isModalOpen} onConfirmNav={handleConfirmNav} onCancelNav={handleCancelNav} />

							{location.state !== 'finished' ? (
								<>
									<Header process='machine vision' abort={handleNavigate} />
									<div className='mask'></div>
									<VisualScanner data={scanData} stage={scanStage} landmarks={landmarks} facemap={facemap} mesh={mesh} />
								</>
							) : (
								<div className='tw-flex tw-flex-col tw-flex-1 tw-justify-center tw-items-center'>
									<Result qrUrl={scanData?.qr_code_link} />
								</div>
							)}
						</motion.div>
					)
			}
		</AnimatePresence>
	)
}

export default MachineVision