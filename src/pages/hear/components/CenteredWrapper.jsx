import { motion } from 'framer-motion'

const CenteredWrapper = ({ children, animDuration }) => {
	return (
		<div className='tw-flex tw-flex-1 tw-items-center tw-justify-center'>
			<motion.div
				className="tw-bg-gradient-to-r tw-from-white tw-to-[#EFF8FF] tw-p-9 tw-rounded-3xl tw-min-w-[800px] tw-max-w-[868px]"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: animDuration }}
			>
				{children}
			</motion.div>
		</div>
	)
}

export default CenteredWrapper