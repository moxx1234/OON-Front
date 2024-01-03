import { useEffect, useRef, useState } from 'react'
import { socket } from '../api/machineVision'
import highCompressed from "../assets/video/high-bg.mp4"

const VideoRenderer = ({ location }) => {
	const [isStreaming, setIsStreaming] = useState(false)
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		canvas.width = canvas.closest('div').offsetWidth
		canvas.height = canvas.closest('div').offsetHeight
		canvas.style.transition = '.5s linear'
		canvas.style.opacity = 1
		const context = canvas.getContext('2d')
		const localVideo = document.getElementById('local-video')
		localVideo.style.transition = '.5s linear'

		if (location.pathname === '/see' && location.state !== 'finished') {
			socket.connect()
			socket.once('video_frame', () => {
				setIsStreaming(true)
			})
		} else {
			localVideo.style.opacity = 1
		}

		const draw = (image) => {
			context.drawImage(image, 0, 0, canvas.width, canvas.height)
		}

		socket.on('video_frame', (data) => {
			// Convert the ArrayBuffer to a Uint8Array
			const uint8Array = new Uint8Array(data)

			// Create an image from the Uint8Array
			const img = new Image()
			const blob = new Blob([uint8Array], { type: 'image/jpeg' })
			img.src = URL.createObjectURL(blob)

			// Draw the image on the canvas
			img.onload = () => {
				draw(img)
				localVideo.style.opacity = 0
			}
		})

		return () => {
			socket.off('video_frame')
		}
	}, [isStreaming, location])

	return (
		<div className="w-screen h-screen absolute object-left-top -z-10">
			{/* <AnimatePresence> */}
			<canvas ref={canvasRef} id='full-canvas' />
			<video
				className='absolute top-0 left-0'
				id="local-video"
				src={highCompressed}
				loop
				muted
				autoPlay
			/>
			{/* </AnimatePresence> */}
		</div>
	)
}

export default VideoRenderer
