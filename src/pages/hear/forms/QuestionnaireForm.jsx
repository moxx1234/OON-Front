import { Formik } from 'formik'
import { motion } from 'framer-motion'
import * as yup from 'yup'
import Button from '../../../components/Button'
import AllRadioControls from './AllRadioControls'
import RadioFieldSet from './RadioFieldset'

const QuestionnaireForm = ({ onSubmit, onCancelSubmit }) => {
	const initialValues = {
		has_fever: '',
		dry_cough: '',
		muscle_aches: '',
		headache: '',
		shortness_of_breath: '',
		sore_throat: '',
		tired_more_than_usual: '',
	}
	const yupRules = Object.keys(initialValues).reduce((acc, symptome) => ({ ...acc, [symptome]: yup.boolean().required('Please select one of the options') }), {})
	const schema = yup.object(yupRules)

	const questions = Object.keys(initialValues).reduce((acc, field) => {
		if (field === 'has_fever') return acc
		const value = field.replace(/_/g, ' ')
		return [...acc, value]
	}, [])

	return (
		<motion.div
			className="tw-bg-gradient-to-r tw-from-white tw-to-[#EFF8FF] tw-p-9 tw-rounded-3xl"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className='tw-mb-9'>
				<h1 className='tw-text-[32px] tw-font-bold tw-text-center'>Health Assessment Questionnaire</h1>
				<p className='tw-text-[#434A54] tw-text-lg tw-text-center'>Please answer the following questions to assist in your medical scan. <br /> If you do not recall, please select NO</p>
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, touched, initialValues, isSubmitting, isValid, errors }) => {
					const isAllTouched = Object.keys(touched).length === Object.keys(initialValues).length
					return (
						<form className='tw-w-[888px] tw-flex tw-flex-col' onSubmit={handleSubmit}>
							<div className='tw-mb-3 tw-self-center'>
								<RadioFieldSet label="Do you currently have a fever?" name="has_fever" />
							</div>
							<div className='tw-border-t tw-border-[#D5DDE3] tw-flex tw-justify-between tw-items-center tw-pt-3'>
								<h2 className='tw-text-[22px] tw-font-semibold'>Over the past week, have you had:</h2>
								<AllRadioControls />
							</div>
							<div className='tw-flex tw-flex-wrap tw-gap-3 tw-mt-4'>
								{questions.map((question, index) => (
									<div className='tw-basis-[45%] tw-flex-1' key={index}>
										<RadioFieldSet label={question} name={Object.keys(initialValues)[index + 1]} />
									</div>
								))}
							</div>
							<div className='tw-flex tw-gap-4 tw-mt-9'>
								<Button className='tw-flex-1 tw-py-6 tw-text-xl tw-font-semibold' style='dismiss' text="cancel" type="button" onClick={onCancelSubmit} />
								<Button className='tw-flex-1 tw-py-6 tw-text-xl tw-font-semibold' style='confirm' text="confirm" type="submit" disabled={isSubmitting || (!isValid && isAllTouched)} />
							</div>
						</form>
					)
				}}
			</Formik>
		</motion.div>
	)
}

export default QuestionnaireForm