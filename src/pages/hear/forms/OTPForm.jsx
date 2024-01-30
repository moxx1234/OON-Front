import { Formik } from "formik"
import { useNavigate } from "react-router"
import * as yup from 'yup'
import { postDeviceData } from "../../../api/vibrome/checkDevice"
import Button from "../../../components/Button"
import DeviceNumberHint from "../questionnaire/DeviceNumberHint"
import OTPField from "./OTPField"
import { AnimatePresence, motion } from "framer-motion"

const otpLength = 6

const OTPForm = () => {
	const initialValues = { device_id: '', user_id: '' }
	const navigate = useNavigate()

	const schema = yup.object({
		device_id: yup.string().required('Device number mismatch. Please enter the device number specified on the device').length(otpLength, 'invalid length'),
		user_id: yup.string().required('To proceed, enter the 6-digit Clinician\'s User ID').length(otpLength, 'invalid length'),
	})

	const handleSubmit = (values, { setSubmitting, setFieldError }) => {
		postDeviceData(values)
			.then((result) => { navigate('/hear/questionnaire', { replace: true }) })
			.catch(error => {
				if (error.response.status !== 400) return console.error(error)
				const fieldErrors = error.response.data.errors
				fieldErrors.forEach(({ field, message }) => setFieldError(field, message))
			})
			.finally(() => setSubmitting(false))
	}
	const handleAbort = () => {
		navigate('/', { replace: true })
	}

	return (
		<AnimatePresence>
			<motion.div
				className="tw-flex tw-flex-col tw-flex-1 tw-items-center tw-justify-around"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<Formik
					initialValues={initialValues}
					validationSchema={schema}
					onSubmit={handleSubmit}
				>
					{({ touched, handleSubmit, isSubmitting, isValid }) => {
						const isAllTouched = !!touched.device_id && !!touched.user_id
						return (
							<form onSubmit={handleSubmit} className="tw-bg-gradient-to-r tw-from-white tw-to-[#EFF8FF] tw-p-9 tw-rounded-3xl">
								<div className="tw-mb-6">
									<OTPField
										name="device_id"
										label="Device Number"
										otpLength={otpLength}
										Hint={DeviceNumberHint}
									/>
								</div>
								<div className="tw-mb-9">
									<OTPField
										name="user_id"
										label="Clinician's User ID"
										otpLength={otpLength}
									/>
								</div>
								<div className="tw-flex tw-gap-4">
									<Button
										style='dismiss'
										text='cancel'
										type="button"
										className='tw-flex-1 tw-py-6 tw-font-semibold tw-text-xl'
										onClick={handleAbort}
									/>
									<Button
										style='confirm'
										text='confirm'
										className='tw-flex-1 tw-py-6 tw-font-semibold tw-text-xl'
										type="submit"
										disabled={isSubmitting || (!isValid && isAllTouched)}
									/>
								</div>
							</form>
						)
					}}
				</Formik>
				<p className="tw-font-bold tw-text-[44px] tw-text-[#434A54] tw-uppercase tw-text-center">Device not intended for clinical diagnosis</p>
			</motion.div>
		</AnimatePresence>
	)
}

export default OTPForm