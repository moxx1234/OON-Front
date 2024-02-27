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
	const [barWidth, setBarWidth] = useState(0)
	const [maxBars, setMaxBars] = useState(0)

	useEffect(() => {
		const graph = wrapperRef.current.querySelector('svg')
		if (graph) return

		const containerWidth = wrapperRef.current.offsetWidth - (margin.right + margin.left)
		// const containerFitWidth = containerWidth + (containerWidth % (barWidth + barOffset) - barWidth)
		const containerHeight = wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		const xDomain = [0, 500]
		const yDomain = [0, Math.pow(10, inputValue) + Math.pow(10, inputValue) / 10]
		const xRange = [0, containerWidth]
		const yRange = [wrapperRef.current.offsetHeight - (margin.top + margin.bottom), 0]

		drawAxises(wrapperRef.current, margin, { x: xDomain, y: yDomain }, { x: xRange, y: yRange })

		// Positioning wrapper
		const graphWrapper = d3.select(wrapperRef.current).append('div')
			.style('width', `${containerWidth}px`)
			.style('height', `${containerHeight}px`)
			.style('position', 'absolute')
			.style('left', `${margin.left}px`)
			.style('top', `${margin.top}px`)

		// Graph viewbox
		const barsWrapper = graphWrapper.append('svg')
			.classed('bars-wrapper', true)
			.style('height', '100%')
			.style('width', '100%')
			.style('display', 'flex')
			.style('position', 'relative')
			.style('overflow', 'hidden')

		barsWrapper.selectAll('rect')
			.exit()
			.remove()

	}, [])

	useEffect(() => {
		const containerWidth = wrapperRef.current.offsetWidth - (margin.right + margin.left)
		const containerHeight = wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		const size = {
			width: containerWidth,
			height: containerHeight
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
		if (!data) return
		if (!data.frequency_versus_time) return
		const containerHeight = wrapperRef.current.offsetHeight - (margin.top + margin.bottom)
		const containerWidth = wrapperRef.current.offsetWidth - (margin.left + margin.right)
		const barWidth = containerWidth / data.frequency_versus_time.length

		// const yScale = d3.scaleLinear().domain(d3ScaleProp.domain).range(d3ScaleProp.range)

		const bars = d3.select('.bars-wrapper')
			.selectAll('rect')
			.data(data.frequency_versus_time)

		bars.enter()
			.append('rect')
			.attr('width', barWidth)
			.attr('x', (d, i) => i * barWidth)
			.attr('fill', '#6A727D')
			.style('transform', 'rotate(180deg)')
			.style('transform-origin', 'bottom center')
			.attr('y', d => containerHeight)

		bars.transition()
			.duration(100)
			.attr('height', d => d)

	}, [data?.frequency_versus_time])

	// useEffect(() => {
	// 	const yScale = d3.scaleLinear().domain(d3ScaleProp.domain).range(d3ScaleProp.range)
	// 	d3.select('.bars-wrapper')
	// 		.selectAll('rect')
	// 		.transition()
	// 		.duration(100)
	// 		.attr('height', d => yScale(d))
	// }, [])

	const handleChange = ({ target }) => {
		setInputValue(target.value)
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