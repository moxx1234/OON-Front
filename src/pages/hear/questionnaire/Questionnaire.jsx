import { useState } from "react"
import Questions from "./Questions"
import QuestionnaireForm from "../forms/QuestionnaireForm"
import { submitQuestionnaire } from "../../../api/vibrome/questionnaire"
import { AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router"

const stages = [
	'personal_data_consent',
	'covid_contacts',
	'health_assesment_questionnaire'
]

const Questionnaire = () => {
	const [answers, setAnswers] = useState({})
	const [stage, setStage] = useState(0)
	const navigate = useNavigate()
	console.log(answers)

	const handleAnswer = ({ target }) => {
		const { value } = target
		setAnswers((prevAnswers) => ({ ...prevAnswers, [stages[stage]]: value === 'yes' ? true : false }))
		setStage(stage + 1)
	}

	const handleSubmit = (values, props) => {
		const requestBody = { answers, health_assesment_questionnaire: values }
		submitQuestionnaire(requestBody)
			.then(() => navigate('/hear/scanner', { state: 'deviceInstruction' }))
			.catch(error => console.log(error))
			.finally(() => props.setSubmitting(false))
	}

	const handleCancelSubmit = () => {
		setStage(stage - 1)
	}

	return (
		<div className="tw-flex tw-flex-1 tw-items-center tw-justify-center">
			<AnimatePresence>
				{stage < 2 ? <Questions stage={stage} onAnswer={handleAnswer} /> : <QuestionnaireForm onCancelSubmit={handleCancelSubmit} onSubmit={handleSubmit} />}
			</AnimatePresence>
		</div>
	)
}

export default Questionnaire