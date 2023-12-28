import { useEffect, useRef, useState } from "react"

const SemiCircle = ({ value }) => {
	const [doubleHeight, setDoubleHeight] = useState(0)
	const wrapperRef = useRef(null)
	useEffect(() => {
		const wrapper = wrapperRef.current
		const wrapperHeight = wrapper.offsetHeight
		const body = wrapper.querySelector('.bw-body')
		wrapper.style.height = `${wrapperHeight}px`
		body.style.height = `${wrapperHeight * 2}px`
		console.log(body)
	}, [])
	return (
		<div ref={wrapperRef} className="progress-wheel-wrapper w-44 h-full flex-grow-0 overflow-hidden">
			<div className='bw-body relative'>
				<div className={`bw-circle absolute w-full h-full left-0 top-0 transition-all`}></div>
				<div className="pw-circle-overlay"></div>
			</div>
		</div>
	)
}

export default SemiCircle