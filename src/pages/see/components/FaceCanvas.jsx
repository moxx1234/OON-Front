import { useEffect, useRef } from "react"

const points = {
	size: 1, // Размер точек в px
	color: "black", // Цвет точек
	scale: 1.5, // Растояние между точками
}

// Обводка точек
const pointsBorder = {
	show: false,
	size: 1,
	color: "#0e639c",
}

// Линии меша
const lineMesh = {
	size: 1,
	color: "black",
}

// коррекция координат для центрирования
const correctLocation = (canvas) => {
	return {
		correctedWidth: canvas.width * (-1),
		correctedHeight: canvas.height / 1.2 * (-1)
	}
}

const FaceCanvas = ({ landmarks, facemap, stage }) => {
	const canvasRef = useRef(null)
	const showLines = stage = 2

	useEffect(() => {
		if (canvasRef.current && landmarks) {
			const canvas = canvasRef.current
			canvas.width = canvas.closest('div').offsetWidth
			canvas.height = canvas.closest('div').offsetHeight
			const ctx = canvas.getContext("2d")
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			const { correctedWidth, correctedHeight } = correctLocation(canvas)

			if (!showLines) {
				// отрисовка точек
				landmarks.forEach((point) => {
					const [originalX, originalY] = point
					const x = originalX * points.scale + correctedWidth
					const y = originalY * points.scale + correctedHeight

					ctx.fillStyle = points.color
					ctx.beginPath()
					ctx.arc(x, y, points.size, 0, 2 * Math.PI)
					if (pointsBorder.show) {
						ctx.strokeStyle = pointsBorder.color
						ctx.lineWidth = pointsBorder.size
						ctx.stroke()
					}
					ctx.fill()
				})
			} else {
				// отрисовка линий
				ctx.strokeStyle = lineMesh.color
				ctx.lineWidth = lineMesh.size
				facemap.forEach(([start, end]) => {
					if (landmarks[start] && landmarks[end]) {
						ctx.beginPath()
						ctx.moveTo(
							landmarks[start][0] * points.scale + correctedWidth,
							landmarks[start][1] * points.scale + correctedHeight
						)
						ctx.lineTo(
							landmarks[end][0] * points.scale + correctedWidth,
							landmarks[end][1] * points.scale + correctedHeight
						)
						ctx.stroke()
					}
				})
			}
		}
	}, [landmarks, facemap, showLines])


	return (
		<canvas ref={canvasRef} className="tw-w-full tw-h-full" width={700} height={700} />
	)
}

export default FaceCanvas