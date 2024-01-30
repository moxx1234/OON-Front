import { useEffect, useState, useRef } from 'react'

const inputMax = 4

const AdjustableGraph = ({ title, data }) => {
	const inputRef = useRef(null)
	const [inputValue, setInputValue] = useState(0)
	const handleChange = ({ target }) => {
		setInputValue(target.value)
	}

	useEffect(() => {
		const inputElement = inputRef.current
		if (inputElement) inputElement.style.background = `linear-gradient(90deg, rgba(9,16,29,1) 0%, rgba(9,16,29,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) ${inputValue * 100 / inputMax}%, rgba(255,255,255,1) 100%)`
	}, [inputValue])

	return (
		<>
			<p className='tw-font-semibold'>{title}</p>
			<div className='tw-h-[168px]'></div>
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