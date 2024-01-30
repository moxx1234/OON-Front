import { motion } from "framer-motion"

const questionClassName = 'tw-text-[32px] tw-font-bold tw-text-pretty tw-text-center'
const descriptionClassName = 'tw-text-[#434A54] tw-text-lg tw-leading-6 tw-text-center'

const Questions = ({ stage, onAnswer }) => {

	const renderQuestions = () => {
		if (stage === 0) {
			return (
				<>
					<h1 className={questionClassName}>Do we have your permission to <br /> record data aimed to support your work performance and safety?</h1>
					<p className={descriptionClassName}>Declining permission will not affect your right to work. Your health data will not be shared with your employer</p>
				</>
			)
		} else {
			return (
				<>
					<h1 className={questionClassName}>Have you had contact with COVID - 19, RSV, or flu?</h1>
					<p className={descriptionClassName}>If you don't know please select NO</p>
				</>
			)
		}
	}

	return (
		<motion.div
			className="tw-bg-gradient-to-r tw-from-white tw-to-[#EFF8FF] tw-p-9 tw-rounded-3xl"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key={stage}
		>
			<div className="tw-max-w-[686px] tw-flex tw-flex-col tw-gap-4 tw-mb-9">
				{renderQuestions()}
			</div>
			<div className="tw-flex tw-gap-4">
				<Button value='no' onClick={onAnswer} />
				<Button value='yes' onClick={onAnswer} />
			</div>
		</motion.div>
	)
}

const Button = ({ value, onClick }) => {
	return <input type="button" value={value} onClick={onClick} className="tw-flex-1 tw-py-6 tw-border-2 tw-border-[#09101D] tw-rounded-3xl tw-text-xl tw-text-inherit tw-font-semibold tw-uppercase " />
}

export default Questions