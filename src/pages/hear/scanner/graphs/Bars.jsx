import { useState, useCallback, useRef, useEffect } from 'react'

const Bars = ({ data, yScale, margin }) => {
	const wrapperRef = useRef(null)
	const barWidth = useRef(0)
	const barY = useRef(0)

	useEffect(() => {
		const width = wrapperRef.current.parentElement.offsetWidth - (margin.left + margin.right)
		const height = wrapperRef.current.parentElement.offsetHeight - (margin.top + margin.bottom)
		wrapperRef.current.style.height = `${height}px`
		wrapperRef.current.style.width = `${width}px`
		wrapperRef.current.style.left = `${margin.left}px`
		wrapperRef.current.style.top = `${margin.top}px`

		barWidth.current = width / data.length
		barY.current = height
	}, [])

	return (
		<div ref={wrapperRef} className='tw-absolute'>
			<svg className='tw-overflow-hidden tw-w-full tw-h-full'>
				{data.map((value, i) => (
					<rect
						key={i}
						x={barWidth.current * i}
						y={barY.current}
						height={yScale(value)}
						width={barWidth.current}
						fill='#6A727D'
						className='tw-rotate-180 tw-origin-bottom'
					></rect>
				))}
			</svg>
		</div>
	)
}

export default Bars