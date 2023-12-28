import { useEffect, useRef, useState } from 'react'
import { socket } from '../api/machineVision'
import highCompressed from "../assets/video/high-bg.mp4"
import { motion, AnimatePresence } from 'framer-motion'

const VideoRenderer = ({ location }) => {
	const [isStreaming, setIsStreaming] = useState(false)
	const canvasRef = useRef(null)
	useEffect(() => {
		if (location.pathname === '/see' && location.state !== 'finished') {
			socket.connect()
			socket.once('video_frame', () => {
				setIsStreaming(true)
			})
		}

		if (isStreaming) {
			const canvas = canvasRef.current
			canvas.width = canvas.closest('div').offsetWidth
			canvas.height = canvas.closest('div').offsetHeight
			const context = canvas.getContext('2d')

			socket.on('video_frame', (data) => {
				// Convert the ArrayBuffer to a Uint8Array
				const uint8Array = new Uint8Array(data)

				// Create an image from the Uint8Array
				const img = new Image()
				const blob = new Blob([uint8Array], { type: 'image/jpeg' })
				img.src = URL.createObjectURL(blob)

				// Draw the image on the canvas
				img.onload = () => {
					context.drawImage(img, 0, 0, canvas.width, canvas.height)
				}
			})

			return () => {
				setIsStreaming(false)
				socket.off('video_frame')
			}
		}
	}, [isStreaming, location])

	return (
		<div className="w-screen h-screen absolute object-left-top -z-10">
			<AnimatePresence mode='wait'>
				{isStreaming ? (
					<motion.canvas
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
						ref={canvasRef} />
				) : (
					<motion.video
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
						src={highCompressed} autoPlay loop muted className='w-full h-full object-cover' />
				)}
			</AnimatePresence>
		</div>
	)
}

export default VideoRenderer
