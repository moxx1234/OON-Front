import { useContext, useEffect, useRef, useState } from 'react'
import { ScanContext } from '../../context/ScannerProvider'
import { drawTriangle, initializeScene } from '../../../../libs/three'
import svgCircle from '../../../../assets/icons/gyro-circle.svg'
import * as THREE from 'three'

const GyroElement = ({ title, name }) => {
	const { data } = useContext(ScanContext)
	const [position, setPosition] = useState([0, 0, 0, 0])
	const objectRef = useRef(null)
	const threeBasisRef = useRef(null)
	const wrapperRef = useRef(null)
	const positionRef = useRef([0, 0, 0, 0])

	useEffect(() => {
		const wrapper = wrapperRef.current
		let canvas = wrapper.querySelector('canvas')

		if (canvas) return

		const width = wrapper.clientWidth
		const height = wrapper.clientHeight

		canvas = document.createElement('canvas')

		canvas.width = width
		canvas.height = height
		if (name === 'side') canvas.style.transform = 'rotate(90deg)'

		wrapper.appendChild(canvas)

		const { scene, renderer, camera } = initializeScene(canvas)
		const triangle = drawTriangle()

		scene.add(triangle)
		renderer.render(scene, camera)

		objectRef.current = triangle
		threeBasisRef.current = { scene, renderer, camera }

		animate()
	}, [])

	useEffect(() => {
		if (!data) return
		setPosition((prev) => {
			if (!data.device_position) return prev
			return data.device_position
		})
	}, [data?.device_position])

	useEffect(() => {
		positionRef.current = position
	}, [position])

	const animate = () => {
		const triangle = objectRef.current
		const { scene, renderer, camera } = threeBasisRef.current
		const quaternion = new THREE.Quaternion().fromArray(positionRef.current)
		triangle.quaternion.copy(quaternion)
		renderer.render(scene, camera)
		requestAnimationFrame(animate)
	}

	return (
		<div className='tw-flex tw-flex-col tw-flex-1'>
			<p className='tw-text-center tw-font-semibold tw-mb-3'>{title}</p>
			<div className='tw-flex-1 tw-relative' ref={wrapperRef}>
				<img src={svgCircle} alt="" className='tw-absolute tw-h-full tw-w-full' />
			</div>
		</div>
	)
}

export default GyroElement