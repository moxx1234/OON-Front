import * as d3 from 'd3'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { drawAxes, rescaleAxis } from '../../../../libs/d3'
import { ScanContext } from "../../context/ScannerProvider"
import Bars from './Bars'

const inputMax = 4
const margin = { top: 0, right: 0, bottom: 24, left: 44 }

const AdjustableGraph = ({ title }) => {
	const { data } = useContext(ScanContext)
	const inputRef = useRef(null)
	const wrapperRef = useRef(null)
	const [inputValue, setInputValue] = useState(2)
	const [d3ScaleProp, setD3ScaleProp] = useState({ domain: [0, 10000], range: [] })

	const yScale = useCallback(d3.scaleLinear().domain(d3ScaleProp.domain).range(d3ScaleProp.range), [d3ScaleProp])

	useEffect(() => {
		const containerWidth = wrapperRef.current.offsetWidth - (margin.right + margin.left)
		const xDomain = [0, 500]
		const yDomain = [0, Math.pow(10, inputValue) + Math.pow(10, inputValue) / 10]
		const xRange = [0, containerWidth]
		const yRange = [wrapperRef.current.offsetHeight - (margin.top + margin.bottom), 0]

		drawAxes(wrapperRef.current, margin, { x: xDomain, y: yDomain }, { x: xRange, y: yRange })
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
		setD3ScaleProp(prevProps => ({ ...prevProps, range: [0, (containerHeight * 10000 / Math.pow(10, inputValue))] }))

		// Set styles
		d3.select(wrapperRef.current).selectAll('text').style('font-size', '12px').style('color', '#434A54')
		d3.select(wrapperRef.current).selectAll('line').attr('stroke', '#D1D9DE')

		// Change input style
		const inputElement = inputRef.current
		if (inputElement) inputElement.style.background = `linear-gradient(90deg, rgba(9,16,29,1) 0%, rgba(9,16,29,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) 100%)`
	}, [inputValue])

	const handleChange = ({ target }) => {
		setInputValue(target.value)
	}

	return (
		<>
			<p className='tw-font-semibold'>{title}</p>
			<div className='tw-h-[168px] tw-relative' ref={wrapperRef}>
				{
					data?.frequency_versus_time && <Bars
						data={data.frequency_versus_time}
						yScale={yScale}
						margin={margin}
					/>
				}
			</div>
			<div className='tw-p-4 tw-rounded-xl tw-bg-[rgba(213,221,227,1)] tw-flex tw-items-center tw-gap-6'>
				<p className='tw-font-bold tw-text-[#0C1022]'>Adjust freq. range</p>
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