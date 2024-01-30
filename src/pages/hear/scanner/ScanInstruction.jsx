import { motion } from "framer-motion"
import Button from "../../../components/Button"
import frontImg from '../../../assets/img/front-instruction.jpg'
import backImg from '../../../assets/img/back-instruction.jpg'

const ScanInstruction = ({ scenario, onRead, onDismiss }) => {

	return (
		<motion.div
			className="tw-flex tw-flex-col tw-gap-9">
			<h1 className="tw-text-[32px] tw-font-bold tw-text-center">INSTRUCTIONS FOR USE</h1>
			<p className='tw-text-xl tw-text-[#434A54] tw-text-center'>The device scans 32 points on the human body, devoting 30 seconds to each point. Initially, it focuses on points located on the front side of the torso, followed by a subsequent scan of points on the back</p>
			<div className="tw-flex tw-justify-center tw-gap-8">
				{scenario === 'only_front' ? <img src={frontImg} alt="front side scanning map" /> : (
					<>
						<img src={frontImg} alt="front side scanning map" />
						<img src={backImg} alt="back side scanning map" />
					</>
				)}
			</div>
			<div className="tw-flex tw-gap-4">
				<Button style="dismiss" text="back" className="tw-flex-1 tw-text-xl tw-font-semibold tw-py-6" onClick={onDismiss} />
				<Button style="confirm" text="continue" className="tw-flex-1 tw-text-xl tw-font-semibold tw-py-6" onClick={onRead} />
			</div>
		</motion.div>
	)
}

export default ScanInstruction