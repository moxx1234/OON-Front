import { useContext, useEffect, useRef, useState } from "react"
import { createChart } from "../../../../libs/smoothie"
import { ScanContext } from "../../context/ScannerProvider"

const WavyGraph = ({ title, name }) => {
	const { data, status } = useContext(ScanContext)
	const [graphData, setGraphData] = useState()
	const canvasRef = useRef(null)
	const chartRef = useRef(null)
	const lineRef = useRef(null)

	useEffect(() => {
		const chartOptions = {
			labels: {
				disabled: true
			},
			grid: {
				fillStyle: 'rgba(0,0,0,0)',
				strokeStyle: 'rgba(0,0,0,0)',
				lineWidth: 0,
				verticalSections: 0,
				borderVisible: false
			}
		}
		const lineOptions = {
			strokeStyle: '#000000',
			lineWidth: 2
		}

		canvasRef.current.width = canvasRef.current.closest('div').offsetWidth
		canvasRef.current.height = canvasRef.current.closest('div').offsetHeight

		const { chart, timeSeries } = createChart(canvasRef.current, chartOptions, lineOptions)

		chartRef.current = chart
		lineRef.current = timeSeries
	}, [])

	useEffect(() => {
		if (!data) return
		const newData = data.wave_graphs.find(graph => graph.title === name).value
		setGraphData(newData)
	}, [data?.wave_graphs])

	useEffect(() => {
		if (graphData === undefined || !lineRef.current) return
		lineRef.current.append(Date.now(), graphData)
	}, [graphData])

	useEffect(() => {
		if (status.isScanning) {
			chartRef.current.start()
			lineRef.current.clear()
		} else {
			chartRef.current.stop()
		}
	}, [status.isScanning])

	return (
		<div className='tw-flex tw-flex-col tw-gap-4'>
			<p className='tw-font-semibold'>{title}</p>
			<div className='tw-h-16'>
				<canvas ref={canvasRef} />
			</div>
		</div>
	)
}

export default WavyGraph