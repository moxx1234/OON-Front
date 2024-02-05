import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import check from '../../../assets/icons/checkmark-fill-white.svg'
import { ScanContext } from '../context/ScannerProvider'
import border from '../../../assets/icons/spin-border.svg'

// const shadowAnimDuration = 3

const ScanPoint = ({ pointNumber, stage }) => {
	const [scope, animate] = useAnimate()
	const { status } = useContext(ScanContext)

	const variants = {
		initial: { boxShadow: '0 0 0 40px rgba(253,63,211,0.40)' },
		shrinking: { boxShadow: '0 0 0 0px rgba(253,63,211,0.40)' }
	}

	return (
		<AnimatePresence mode='wait'>
			{stage <= pointNumber ? (
				<motion.div
					ref={scope}
					exit={{ opacity: 0 }}
					className='tw-font-bold tw-bg-[#FD3FD3] tw-rounded-full tw-aspect-square tw-w-[90px] tw-flex tw-items-center tw-justify-center tw-leading-none  tw-relative tw-text-white tw-text-[40px]'
				>
					<p>
						{pointNumber + 1}
					</p>
					{/* <img src={border} alt="" className='tw-h-full tw-w-full tw-absolute tw-scale-125' /> */}
				</motion.div>
			) : (
				<motion.div
					className='tw-rounded-full tw-aspect-square tw-w-[68px] tw-bg-[#07BB4F] tw-flex tw-justify-center tw-items-center'
				>
					<img src={check} alt='success icon' />
				</motion.div>
			)
			}
		</AnimatePresence>
	)
}

export default ScanPoint