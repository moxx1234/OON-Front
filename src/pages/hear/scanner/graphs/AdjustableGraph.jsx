import { useContext, useEffect, useRef, useState } from 'react'
import { ScanContext } from "../../context/ScannerProvider"
import * as d3 from 'd3'
import { drawAxises, rescaleAxis } from '../../../../libs/d3'

const inputMax = 4
const margin = { top: 0, right: 0, bottom: 24, left: 44 }
const barOffset = 4
const barWidth = 4

const AdjustableGraph = ({ title }) => {
	const { data } = useContext(ScanContext)
	const inputRef = useRef(null)
	const wrapperRef = useRef(null)
	const [inputValue, setInputValue] = useState(3)
	const [d3ScaleProp, setD3ScaleProp] = useState({ domain: [0, 10000], range: [] })
	const [maxBars, setMaxBars] = useState(0)
	const [chartData, setChartData] = useState({ 0: [], 1: [], recentlyFilled: null })

	useEffect(() => {
		const graph = wrapperRef.current.querySelector('svg')
		if (graph) return

		const containerWidth = wrapperRef.current.offsetWidth - (margin.right + margin.left)
		const containerFitWidth = containerWidth + (containerWidth % (barWidth + barOffset) - barWidth)
		const containerHeight = wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		const xDomain = [0, 500]
		const yDomain = [0, Math.pow(10, inputValue) + Math.pow(10, inputValue) / 10]
		const xRange = [0, containerFitWidth]
		const yRange = [wrapperRef.current.offsetHeight - (margin.top + margin.bottom), 0]

		setMaxBars(Math.floor(containerFitWidth / (barWidth + barOffset)) + 1)
		drawAxises(wrapperRef.current, margin, { x: xDomain, y: yDomain }, { x: xRange, y: yRange })

		// Positioning wrapper
		const graphWrapper = d3.select(wrapperRef.current).append('div')
			.style('width', `${containerFitWidth}px`)
			.style('height', `${containerHeight}px`)
			.style('position', 'absolute')
			.style('left', `${margin.left}px`)
			.style('top', `${margin.top}px`)

		// Graph viewbox
		const barsWrapper = graphWrapper.append('div')
			.classed('bars-wrapper', true)
			.style('height', '100%')
			.style('display', 'flex')
			.style('position', 'relative')
			.style('overflow', 'hidden')

		// Create two moving containers for animation
		for (let i = 0; i < 2; i++) {
			barsWrapper.append('svg')
				.classed(`bars-container`, true)
				.attr('width', containerFitWidth)
				.attr('height', containerHeight)
				.style('position', 'absolute')
				.style('left', `${i * 100}%`)
				.style('transition', '.2s left linear')
		}
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
		setD3ScaleProp(prevProps => ({ ...prevProps, range: [0, ((wrapperRef.current.offsetHeight - (margin.top + margin.bottom)) * 10000 / Math.pow(10, inputValue))] }))

		// Set styles
		d3.select(wrapperRef.current).selectAll('text').style('font-size', '12px').style('color', '#434A54')
		d3.select(wrapperRef.current).selectAll('line').attr('stroke', '#D1D9DE')
		// Change input style
		const inputElement = inputRef.current
		if (inputElement) inputElement.style.background = `linear-gradient(90deg, rgba(9,16,29,1) 0%, rgba(9,16,29,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) 100%)`
	}, [inputValue])

	useEffect(() => {
		console.log(data)
		if (!maxBars || !data?.frequency_versus_time) return

		// Fill corresponding data array and trace the filling proccess
		setChartData(prev => {
			if (prev[0].length < maxBars) return { ...prev, 0: [...prev[0], data.frequency_versus_time] }
			else if (prev[1].length < maxBars) return { ...prev, 1: [...prev[1], data.frequency_versus_time] }
			else {
				const newData = clearArray(prev.recentlyFilled === null ? 1 : 0)
				return { ...prev, ...newData, recentlyFilled: prev.recentlyFilled === null ? 1 : Number(!prev.recentlyFilled) }
			}
		})
	}, [data?.frequency_versus_time, maxBars])

	useEffect(() => {
		if (!maxBars || !d3ScaleProp.range.length) return
		const barsContainers = document.querySelectorAll('.bars-container')

		const yScale = d3.scaleLinear().domain(d3ScaleProp.domain).range(d3ScaleProp.range)

		// Draw bars and animate containers movement
		if (chartData[0].length < maxBars) {
			drawBar(barsContainers[0], chartData[0], yScale)
			if (chartData.recentlyFilled === null) return
			moveLeft(barsContainers)
		} else if (chartData[1].length < maxBars) {
			drawBar(barsContainers[1], chartData[1], yScale)
			moveLeft(barsContainers)
		}

	}, [chartData, maxBars])

	useEffect(() => {
		const containerHeight = wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		rescaleBars(d3ScaleProp, containerHeight)
	}, [d3ScaleProp])

	const handleChange = ({ target }) => {
		setInputValue(target.value)
	}

	const clearArray = (lastFilled) => {
		return { [Number(!lastFilled)]: [] }
	}
	const moveLeft = (items) => {
		items.forEach(item => {
			const currentPosition = item.style.left.replace('%', '')
			if (currentPosition === '-99') {
				item.style.transition = 'none'
				item.style.display = 'none'
				item.style.left = '100%'
				item.style.transition = '.2s left linear'
				return
			}
			item.style.display = 'block'
			item.style.left = `${currentPosition - 1}%`
		})
	}
	const drawBar = (container, data, scale) => {
		const bars = d3.select(container).selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('width', barWidth)
			.attr('height', (d) => scale(d))
			.attr('y', (d) => (wrapperRef.current.offsetHeight - (margin.top + margin.bottom) - scale(d)) / 2)
			.attr('opacity', 0)
			.attr('x', (d, i) => (barWidth + barOffset) * i)
			.attr('rx', 2)
			.attr('stroke', '#6A727D')
			.attr('fill', '#6A727D')
		bars.transition().duration(300).attr('opacity', 1)
	}
	const rescaleBars = (scaleProps, containerHeight) => {
		const bars = d3.selectAll('.bars-container').selectAll('rect')
		const scale = d3.scaleLinear().domain(scaleProps.domain).range(scaleProps.range)
		bars.transition().duration(300)
			.attr('height', (d) => scale(d))
			.attr('y', (d) => (containerHeight - scale(d)) / 2)
			.attr('opacity', 1)
	}

	return (
		<>
			<p className='tw-font-semibold'>{title}</p>
			<div className='tw-h-[168px] tw-relative' ref={wrapperRef}>
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