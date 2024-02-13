import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const initializeScene = (container) => {
	const width = container.width
	const height = container.height
	const camera = new THREE.PerspectiveCamera(50, width / height, 5, 1000)
	const renderer = new THREE.WebGLRenderer({
		canvas: container,
		alpha: true
	})
	const scene = new THREE.Scene()

	new OrbitControls(camera, renderer.domElement)

	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(width, height)
	camera.position.setZ(15)

	const lightPositions = [
		[5, 5, 5],
		[-5, 5, 5],
		[5, -5, 5],
		[-5, -5, 5],
	]

	lightPositions.forEach(position => {
		const { light, helper } = setPointerLight(position)
		scene.add(light)
		if (helper) scene.add(helper)
	})

	return { scene, renderer, camera }
}

export const setPointerLight = (position) => {
	const [x, y, z] = position
	const light = new THREE.PointLight(0xffffff, 20)
	const lightHelper = new THREE.PointLightHelper(light)

	light.position.set(x, y, z)

	return {
		light,
		lightHelper
	}
}

export const drawTriangle = () => {
	const material = new THREE.MeshStandardMaterial({ color: 0x3773F0, flatShading: true })

	const shape = new THREE.Shape()
	const x = 0
	const y = 0
	const triangleHeight = Math.sqrt(3) * 2
	const arcOffset = 0.4
	const sideLength = 2 * 2

	shape.moveTo(x - sideLength, y - triangleHeight + arcOffset)
	shape.quadraticCurveTo(x - sideLength, y - triangleHeight, x - sideLength + arcOffset, y - triangleHeight)
	shape.lineTo(x + sideLength - arcOffset, y - triangleHeight)
	shape.quadraticCurveTo(x + sideLength, y - triangleHeight, x + sideLength, y - triangleHeight + arcOffset)
	shape.lineTo(x + arcOffset, y + triangleHeight - arcOffset)
	shape.quadraticCurveTo(x, y + triangleHeight, x - arcOffset, y + triangleHeight - arcOffset)
	shape.lineTo(x - sideLength, y - triangleHeight + arcOffset)

	const extrudedOptions = {
		steps: 10,
		depth: 1,
	}

	const geometry = new THREE.ExtrudeGeometry(shape, extrudedOptions)
	const triangleMesh = new THREE.Mesh(geometry, material)
	const triangle = new THREE.Object3D()
	const axisHelper = new THREE.AxesHelper(5)

	triangle.add(triangleMesh)
	triangle.add(axisHelper)
	triangle.name = 'triangle'

	return triangle
}