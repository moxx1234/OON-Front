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
		// vertices.current = [
		// 	[0.9267270051527281, 0.42572787117711436, -0.26277192382823894],
		// 	[0.843713162596267, 0.464604644259373, -0.17936759469238445],
		// 	[0.890629888030904, 0.44263275580902856, -0.06678411165736381],
		// 	[1.7941663029330923, 0.01949151704732506, 0.8157875687999265],
		// 	[1.9010856527341646, -0.030580605532614772, 0.8534707061206906],
		// 	[1.9659243737915428, -0.060945664754841755, 0.7523129724076701],
		// 	[2.206340343856713, -0.1735364908838421, -0.5530156449716876],
		// 	[2.182434836612101, -0.16234114138616082, -0.6741031114283064],
		// 	[2.070679390120086, -0.11000419371358962, -0.6855288607503063],
		// 	[0.8419045705243726, 0.24460593961671612, -0.2627719238282389],
		// 	[0.758890727967912, 0.2834827126989746, -0.1793675946923845],
		// 	[0.8058074534025488, 0.2615108242486303, -0.06678411165736381],
		// 	[1.709343868304737, -0.16163041451307333, 0.8157875687999264],
		// 	[1.8162632181058094, -0.21170253709301304, 0.8534707061206908],
		// 	[1.8811019391631878, -0.24206759631524002, 0.7523129724076701],
		// 	[2.1215179092283574, -0.3546584224442404, -0.5530156449716876],
		// 	[2.0976124019837457, -0.3434630729465592, -0.6741031114283064],
		// 	[1.985856955491731, -0.29112612527398785, -0.6855288607503063]
		// ]
	}, [])

	useEffect(() => {
		if (!data) return
		vertices.current = data.device_position[name]
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
			<div className='tw-flex-1 tw-relative' ref={wrapperRef}>
				<img src={svgCircle} alt="" className='tw-absolute tw-h-full tw-w-full' />
			</div>
		</div>
	)
}

export default GyroElement