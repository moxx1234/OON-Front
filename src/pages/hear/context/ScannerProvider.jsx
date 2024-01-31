import { createContext, useEffect, useState, useRef } from "react"
import useVibromeControls from "../../../hooks/useVibromeControls"
import { socket } from "../../../api/socket"
import { useNavigate } from "react-router"

const stageDuration = 5000
const totalStages = { front: 6, back: 6 }

export const ScanContext = createContext()

const ScannerProvider = ({ children, scenario }) => {
	const [controls, state] = useVibromeControls()
	const [scanStatus, setScanStatus] = useState({ side: 'front', stage: 0 })
	const [scanData, setScanData] = useState()
	const intervalId = useRef(null)
	const navigate = useNavigate()

	// Socket connection
	useEffect(() => {
		socket.connect()
		socket.emit('get_measurements')

		return () => {
			socket.removeAllListeners('data_response')
			socket.disconnect()
		}
	}, [])

	// Navigation depending on chosen scenario
	useEffect(() => {
		if (scanStatus.stage < totalStages[scanStatus.side]) return

		if (scenario === 'front_and_back' && scanStatus.side === 'front') {
			setScanStatus({ side: 'back', stage: 0 })
			stopScan()
			controls.restart()
		}
		else navigate(-1)
	}, [scanStatus, scenario, navigate])

	const handleStart = () => {
		controls.start()
		startScan()
		socket.on('data_response', data => setScanData(data))
	}
	const handlePause = () => {
		controls.stop()
		stopScan()
		socket.removeAllListeners('data_response')
	}
	const handleRestart = () => {
		controls.restart()
		handlePause()
		setScanStatus(prevStatus => ({ ...prevStatus, stage: 0 }))
	}

	const startScan = () => {
		// Change scan stage
		const interval = setInterval(() => {
			setScanStatus(prevStatus => ({ ...prevStatus, stage: prevStatus.stage + 1 }))
			handlePause()
		}, stageDuration)

		intervalId.current = interval
	}
	const stopScan = () => {
		clearInterval(intervalId.current)
	}

	const { isScanning, hasStarted } = state
	const value = {
		controls: {
			start: handleStart,
			stop: handlePause,
			restart: handleRestart,
		},
		status: {
			...scanStatus,
			isScanning,
			hasStarted,
			totalStages
		},
		data: scanData
	}

	return (
		<ScanContext.Provider value={value} >
			{children}
		</ScanContext.Provider>
	)
}

export default ScannerProvider