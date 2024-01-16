import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Точки отрисовываются,
 * но изображение перевернуто, надо понять на чьей стороне ошибка front или back
 *
 * Сделал также центрирование в canvas объета из точек
 */

const axesLines = false // Линии координат. для отладки
// const objectSize = 40 // Размер объекта из точек (деление на диапазон. Чем меньше значение, тем больше размер)

// Параметры отрисовки точек
const pointParams = {
	color: 0x000000, // 16bit цвет
	size: 2,
}

const FaceMesh3d = ({ points }) => {
	const mountRef = useRef(null)

	useEffect(() => {
		if (!points) { return }
		const divBlock = mountRef.current
		const canvasSize = {
			width: divBlock.offsetWidth,
			height: divBlock.offsetHeight
		}

		const scene = new THREE.Scene()

		// Создание камеры
		const camera = new THREE.PerspectiveCamera(
			90,
			canvasSize.width / canvasSize.height,
			0.1,
			0
		)
		camera.position.z = 150

		// Рендер с прозрачным фоном
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setSize(canvasSize.width, canvasSize.height)
		divBlock.appendChild(renderer.domElement)

		if (axesLines) {
			const axesHelper = new THREE.AxesHelper(2)
			scene.add(axesHelper)
		}

		// Отрисовка точек
		const vertices = new Float32Array(points.flat())
		const geometry = new THREE.BufferGeometry()
		geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
		const material = new THREE.PointsMaterial({
			color: pointParams.color, // Цвет точек в 16bit
			size: pointParams.size, // Размер точек
			sizeAttenuation: true
		})

		const points3d = new THREE.Points(geometry, material)
		geometry.center() // центрирование объекта
		scene.rotateZ(Math.PI)
		scene.add(points3d)

		// Функция анимации
		const animate = () => {
			requestAnimationFrame(animate)
			renderer.render(scene, camera)
		}
		animate()

		// Размонтирование
		return () => {
			divBlock.removeChild(renderer.domElement)
			renderer.forceContextLoss()
			renderer.dispose()
			geometry.dispose()
			material.dispose()
		}
	}, [points])

	return <div
		className="tw-w-full tw-h-full tw--scale-x-100"
		ref={mountRef}
	/>
}

export default FaceMesh3d