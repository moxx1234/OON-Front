import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js'

export const initializeScene = (container) => {
	const width = container.width
	const height = container.height
	const camera = new THREE.PerspectiveCamera(50, width / height, .5, 1000)
	const renderer = new THREE.WebGLRenderer({
		canvas: container,
		alpha: true
	})
	const scene = new THREE.Scene()

	new OrbitControls(camera, renderer.domElement)

	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(width, height)

	// inverse the camera
	camera.rotation.y = Math.PI
	camera.position.setZ(-4)

	const lightPositions = [
		[5, 0, 5],
		[-5, 0, 5],
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

export const createTriangle = (vertices) => {
	const edges = vertices.map(vertex => {
		const [x, y, z] = vertex
		return new THREE.Vector3(x, y, z)
	})
	const geometry = new ConvexGeometry(edges)
	const material = new THREE.MeshStandardMaterial({ color: 0x3773F0 })
	const mesh = new THREE.Mesh(geometry, material)

	const triangle = new THREE.Object3D()

	triangle.add(mesh)

	return triangle
}

export const center3dObject = (object) => {
	const box = new THREE.Box3().setFromObject(object)
	const center = box.getCenter(new THREE.Vector3())

	center.x = -center.x
	center.y = -center.y
	center.z = -center.z

	object.position.add(center)
}