import { useEffect, useRef } from 'react'
import { socket } from '../api/socket'
import highCompressed from "../assets/video/high-bg.mp4"

const VideoRenderer = ({ location }) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		canvas.width = canvas.closest('div').clientWidth
		canvas.height = canvas.closest('div').clientHeight
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
		<div className="tw-w-full tw-h-full tw-absolute tw-object-left-top tw--z-10">
			<canvas ref={canvasRef} id='full-canvas' />
			<video
				className='tw-absolute tw-top-0 tw-left-0 tw-h-full tw-w-full tw-object-cover'
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
