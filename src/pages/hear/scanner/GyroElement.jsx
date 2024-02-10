import { useContext, useEffect, useRef, useState } from 'react'
import { ScanContext } from '../context/ScannerProvider'

const GyroElement = ({ title, image, name }) => {
	const { data } = useContext(ScanContext)
	const [position, setPosition] = useState([])
	const imageRef = useRef(null)

	useEffect(() => {
		if (!data) return
		setPosition(data.device_position)
		imageRef.current.style.transition = '.1s transform linear'
	}, [data])

	useEffect(() => {
		// imageRef.current.style.transform = `matrix(0, 0, ${position.front[2]}, 0, 0, ${position.side[2]})`
	}, [JSON.stringify(position)])

	return (
		<div>
			<p className='tw-text-center tw-font-semibold tw-mb-3'>{title}</p>
			<img ref={imageRef} src={image} alt="gyroscope" />
		</div>
	)
}

export default GyroElement