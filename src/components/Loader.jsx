import loader from '../assets/icons/loader.svg'
import { motion } from 'framer-motion'
import logo from '../assets/logo.svg'

const Loader = ({ icon, text, status }) => {
	return (
		<div className='tw-w-screen tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center gap-14'>
			<motion.div
				exit={{ opacity: 0 }}
				transition={{ duration: .5 }}
			>
				<img src={logo} alt="logo" />
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: .5 }}
				className='tw-relative tw-w-80 tw-min-h-[432px] tw-flex tw-flex-col tw-items-center tw-justify-center'
			>
				<motion.img
					src={loader}
					alt="loader"
					className='tw-absolute'
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
				{icon && <img src={icon} alt="icon" className='tw-w-20 tw-h-20' />}
				{text && <p className='tw-uppercase'>{text}</p>}
				<p>{status}</p>
			</motion.div>
		</div>
	)
}

export default Loader