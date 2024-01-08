import { useEffect, useRef } from 'react'
import { socket } from '../api/machineVision'
import highCompressed from "../assets/video/high-bg.mp4"

const VideoRenderer = ({ location }) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		canvas.width = canvas.closest('div').offsetWidth
		canvas.height = canvas.closest('div').offsetHeight
		canvas.style.opacity = 1

		const context = canvas.getContext('2d')
		const localVideo = document.getElementById('local-video')
		localVideo.style.transition = '.5s linear'

		if (location.pathname === '/see' && location.state !== 'finished') {
			socket.connect()

			// stream video from backend
			socket.on('video_frame', (data) => {
				const uint8Array = new Uint8Array(data)
				const img = new Image()
				const blob = new Blob([uint8Array], { type: 'image/jpeg' })

				img.src = URL.createObjectURL(blob)
				img.onload = () => {
					context.drawImage(img, 0, 0, canvas.width, canvas.height)
					localVideo.style.opacity = 0
				}
			})
		} else {
			localVideo.style.opacity = 1
		}

		return () => {
			socket.off('video_frame')
		}
	}, [location])

	return (
		<div className="w-screen h-screen absolute object-left-top -z-10">
			<canvas ref={canvasRef} id='full-canvas' />
			<video
				className='absolute top-0 left-0'
				id="local-video"
				src={highCompressed}
				loop
				muted
				autoPlay
			/>
		</div>
	)
}

export default VideoRenderer
