import loader from '../assets/icons/loader.svg'
import { motion } from 'framer-motion'

const Loader = ({ icon, text, status }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: .5 }}
			className='relative w-80 h-80 flex flex-col items-center justify-center'
		>
			<motion.img
				src={loader}
				alt="loader"
				className='absolute'
				animate={{
					rotate: '-360deg',
					transition: {
						repeat: Infinity,
						repeatType: 'loop',
						duration: 5,
						ease: 'linear'
					}
				}}
			/>
			{icon && <img src={icon} alt="icon" className='w-20 h-20' />}
			{text && <p className='uppercase'>{text}</p>}
			<p>{status}</p>
		</motion.div>
	)
}

export default Loader