import { createContext, useEffect, useState, useRef } from "react"
import useVibromeControls from "../../../hooks/useVibromeControls"
import { socket } from "../../../api/socket"
import { useNavigate } from "react-router"

const stageDuration = 30000
const totalStages = { front: 6, back: 6 }

export const ScanContext = createContext()

const ScannerProvider = ({ children, scenario }) => {
	const [controls, state] = useVibromeControls()
	const [scanStatus, setScanStatus] = useState({ side: 'front', stage: 0 })
	const [scanData, setScanData] = useState()
	const [resultLink, setResultLink] = useState('')
	const intervalId = useRef(null)
	const navigate = useNavigate()

	// Socket connection
	useEffect(() => {
		socket.connect()

		return () => {
			socket.removeAllListeners('data_response')
			socket.disconnect()
			clearInterval(intervalId)
		}
	}, [])

	useEffect(() => {
	}, [scanData])

	// Navigation depending on chosen scenario
	useEffect(() => {
		if (scanStatus.stage < totalStages[scanStatus.side]) return

		if (scenario === 'front_and_back' && scanStatus.side === 'front') {
			setScanStatus({ side: 'back', stage: 0 })
			stopScan()
			controls.restart()
		}
		else navigate(`/result/:${scanData.qr_code_link || 'google.com'}`)
	}, [scanStatus, scenario, navigate, scanData])

	const handleStart = () => {
		controls.start()
		startScan()
		socket.emit('start_scan')
		socket.on('data_response', data => setScanData(data))
	}
	const handlePause = () => {
		controls.stop()
		stopScan()
		if (state.isScanning) socket.emit('pause_scan')
		socket.removeAllListeners('data_response')
	}
	const handleRestart = () => {
		controls.restart()
		handlePause()
		setScanStatus(prevStatus => ({ ...prevStatus, stage: 0 }))
	}
	const showQr = () => {
		navigate(`/result/:`, { replace: true })
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
			stageDuration,
			totalStages,
			scenario
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