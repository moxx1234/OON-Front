import { useEffect, useState } from "react"

const useVibromeControls = (scenario) => {
	const [startClicks, setStartClicks] = useState(0)
	const [isScanning, setIsScanning] = useState(false)
	const [hasStarted, setHasStarted] = useState(false)

	useEffect(() => {
		setHasStarted(!!startClicks)
	}, [startClicks])

	const startScan = () => {
		setIsScanning(true)
		setStartClicks((clicks) => clicks + 1)
	}
	const stopScan = () => {
		setIsScanning(false)
	}
	const restartScan = () => {
		stopScan()
		setStartClicks(0)
	}

	const controls = {
		start: startScan,
		stop: stopScan,
		restart: restartScan
	}
	const state = {
		isScanning,
		hasStarted
	}

	// returns controller (start, stop, restart) state (hasStarted, isScanning)
	return [controls, state]
}

export default useVibromeControls