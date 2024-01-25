import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router'

const Scanner = () => {
	const location = useLocation()
	console.log(location.state)

	return (
		<AnimatePresence>

		</AnimatePresence>
	)
}

export default Scanner