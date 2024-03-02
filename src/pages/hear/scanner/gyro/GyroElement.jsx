import { useContext, useEffect, useRef } from 'react'
import svgCircle from '../../../../assets/icons/gyro-circle.svg'
import { center3dObject, createTriangle, initializeScene, } from '../../../../libs/three'
import { ScanContext } from '../../context/ScannerProvider'

const GyroElement = ({ title, name }) => {
	const { data } = useContext(ScanContext)
	const vertices = useRef(null)
	const objectRef = useRef(null)
	const threeBasisRef = useRef(null)
	const wrapperRef = useRef(null)

	useEffect(() => {
		const wrapper = wrapperRef.current
		let canvas = wrapper.querySelector('canvas')

		if (canvas) return

		const width = wrapper.clientWidth
		const height = wrapper.clientHeight

		canvas = document.createElement('canvas')

		canvas.width = width
		canvas.height = height

		wrapper.appendChild(canvas)

		const { scene, renderer, camera } = initializeScene(canvas)
		threeBasisRef.current = { scene, renderer, camera }
		animate()
	}, [])

	useEffect(() => {
		if (!data) return
		// vertices.current = data.device_position[name]
	}, [data?.device_position])

	const animate = () => {
		requestAnimationFrame(animate)

		if (!threeBasisRef.current || !vertices.current) return

		const { scene, renderer, camera } = threeBasisRef.current

		if (objectRef.current) scene.remove(objectRef.current)
		const triangle = createTriangle(vertices.current)

		center3dObject(triangle)
		scene.add(triangle)
		renderer.render(scene, camera)
		objectRef.current = triangle
	}

	return (
		<div className='tw-flex tw-flex-col tw-flex-1'>
			<p className='tw-text-center tw-font-semibold tw-mb-3'>{title}</p>
			<div className='tw-flex-1 tw-min-h-[120px] tw-relative' ref={wrapperRef}>
				<img src={svgCircle} alt="" className='tw-absolute tw-h-full tw-w-full' />
			</div>
		</div>
	)
}

export default GyroElement