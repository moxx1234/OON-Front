import { useContext, useEffect, useRef, useState } from 'react'
import { ScanContext } from "../../context/ScannerProvider"
import * as d3 from 'd3'
import { drawAxises, rescaleAxis } from '../../../../libs/d3'

const inputMax = 4
const margin = { top: 0, right: 0, bottom: 24, left: 44 }
const barOffset = 4
const barWidth = 4

const AdjustableGraph = ({ title }) => {
	const { data, status } = useContext(ScanContext)
	const inputRef = useRef(null)
	const wrapperRef = useRef(null)
	const [inputValue, setInputValue] = useState(3)

	const [canvasCtx, setCanvasCtx] = useState()
	const [dataArray, setDataArray] = useState()
	const audioContextRef = useRef(null)
	const mediaStreamRef = useRef(null)
	const sourceRef = useRef(null)
	const analyserRef = useRef(null)
	const animationRef = useRef(0)


	useEffect(() => {
		const graph = wrapperRef.current.querySelector('svg')
		if (graph) return
		const canvas = wrapperRef.current.querySelector('canvas')
		const containerWidth = wrapperRef.current.offsetWidth - (margin.right + margin.left)
		const containerFitWidth = containerWidth + (containerWidth % (barWidth + barOffset) - barWidth)
		const containerHeight = wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		const xDomain = [0, 500]
		const yDomain = [0, Math.pow(10, inputValue) + Math.pow(10, inputValue) / 10]
		const xRange = [0, containerFitWidth]
		const yRange = [containerHeight, 0]

		canvas.width = containerWidth
		canvas.height = containerHeight
		canvas.style.left = `${margin.left}px`
		canvas.style.top = `${margin.top}px`

		drawAxises(wrapperRef.current, margin, { x: xDomain, y: yDomain }, { x: xRange, y: yRange })
		setCanvasCtx(canvas.getContext('2d'))

		if (!audioContextRef.current) audioContextRef.current = new AudioContext()
		mediaStreamRef.current = audioContextRef.current.createMediaStreamDestination()
		sourceRef.current = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current.stream)
		analyserRef.current = audioContextRef.current.createAnalyser()
		analyserRef.current.connect(audioContextRef.current.destination)
		analyserRef.current.fftSize = 256
		const bufferLength = analyserRef.current.frequencyBinCount
		setDataArray(() => new Uint8Array(bufferLength))

		// return () => {
		// 	sourceRef.current.disconnect()
		// 	audioContextRef.current.close()
		// }
	}, [])

	useEffect(() => {
		const containerWidth = wrapperRef.current.offsetWidth - (margin.right + margin.left)
		const containerFitWidth = containerWidth + (containerWidth % (barWidth + barOffset) + barWidth)
		const size = {
			width: containerFitWidth,
			height: wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		}
		// Change graph scale
		const svg = d3.select(wrapperRef.current.querySelector('.axises')).select('g.y-axis')
		rescaleAxis(svg, size, inputValue)

		// Set styles
		d3.select(wrapperRef.current).selectAll('text').style('font-size', '12px').style('color', '#434A54')
		d3.select(wrapperRef.current).selectAll('line').attr('stroke', '#D1D9DE')

		// Change input style
		const inputElement = inputRef.current
		if (inputElement) inputElement.style.background = `linear-gradient(90deg, rgba(9,16,29,1) 0%, rgba(9,16,29,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) 100%)`
	}, [inputValue])

	useEffect(() => {
		if (!data?.frequency_versus_time) return

		const uint8Array = new Uint8Array(data?.frequency_versus_time)
		const audioBuffer = audioContextRef.current.createBuffer(1, uint8Array.length, audioContextRef.current.sampleRate)
		const nowBuffering = audioBuffer.getChannelData(0)
		for (let i = 0; i < uint8Array.length; i++) {
			nowBuffering[i] = (uint8Array[i] - 128) / 128.0
		}
		const audioSourceNode = audioContextRef.current.createBufferSource()
		audioSourceNode.buffer = audioBuffer
		audioSourceNode.connect(mediaStreamRef.current)
		audioSourceNode.start()

	}, [data?.frequency_versus_time])

	useEffect(() => {
		if (!dataArray) return
		animate()
	}, [dataArray])

	useEffect(() => {
		if (!status.isScanning) cancelAnimationFrame(animationRef.current)
	}, [status.isScanning])

	const handleChange = ({ target }) => {
		setInputValue(target.value)
	}
	const animate = () => {
		const canvas = wrapperRef.current.querySelector('canvas')
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
		analyserRef.current.getByteFrequencyData(dataArray)
		drawBars(dataArray)
		animationRef.current = requestAnimationFrame(animate)
	}

	const drawBars = (dataArray) => {
		const containerHeight = wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		const containerWidth = wrapperRef.current.offsetWidth - (margin.left + margin.right)
		const barWidth = (containerWidth / dataArray.length) / 2
		dataArray.forEach((value, index) => {
			const barHeight = value + 1
			const x = index * barWidth * 2
			canvasCtx.fillStyle = 'black'
			canvasCtx.fillRect(x, (containerHeight - barHeight) / 2, barWidth, barHeight)
		})
	}

	return (
		<>
			<p className='tw-font-semibold'>{title}</p>
			<div className='tw-h-[168px] tw-relative' ref={wrapperRef}>
				<canvas className='tw-absolute' />
			</div>
			<div className='tw-p-4 tw-rounded-xl tw-bg-[rgba(213,221,227,1)] tw-flex tw-items-center tw-gap-6'>
				<p className='tw-font-bold tw-text-[#0C1022]'>Adjust Freq. range</p>
				<div className='tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-gap-3'>
					<input
						ref={inputRef}
						type="range"
						name="frequency-range"
						id='frequency-range'
						min={0}
						max={inputMax}
						value={inputValue}
						onInput={handleChange}
					/>
					<div className='tw-flex tw-justify-between tw-px-1'>
						{new Array(inputMax + 1).fill(undefined).map((_, index) => (
							<p key={index} className='frequency-step tw-text-xs tw-font-medium'>{index}</p>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default AdjustableGraph