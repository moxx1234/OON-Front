import { Formik } from "formik"
import * as yup from 'yup'
import Form from "./Form"
import OTPField from "./OTPField"
import Button from "../../../../components/Button"
import { useNavigate } from "react-router"
import { postDeviceData } from "../../../../api/vibrome/checkDevice"
import DeviceNumberHint from "../DeviceNumberHint"

const otpLength = 6

const OTPForm = () => {
	const initialValues = { deviceNumber: '', userId: '' }
	const navigate = useNavigate()

	const schema = yup.object({
		deviceNumber: yup.string().required('Device number mismatch. Please enter the device number specified on the device').length(otpLength, 'invalid length'),
		userId: yup.string().required('To proceed, enter the 6-digit Clinician\'s User ID').length(otpLength, 'invalid length'),
	})

	const handleSubmit = (values, props) => {
		console.log(props)
		postDeviceData(values).then((result) => {
			props.setSubmitting(false)
		})
	}
	const handleAbort = () => {
		navigate('/')
	}

	return (
		<>
			<div className="tw-flex tw-flex-col tw-flex-1 tw-gap-[60px] tw-items-center tw-justify-center">
				<Formik
					initialValues={initialValues}
					validationSchema={schema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, handleSubmit, isSubmitting, isValid }) => {
						const isAllTouched = !!touched.deviceNumber && !!touched.userId
						return (
							<Form>
								<div className="tw-mb-6">
									<OTPField
										name='deviceNumber'
										label='Device Number'
										otpLength={otpLength}
										error={errors.deviceNumber}
										touched={touched.deviceNumber}
										Hint={DeviceNumberHint}
									/>
								</div>
								<div className="tw-mb-9">
									<OTPField
										name='userId'
										label='Clinician’s User ID'
										otpLength={otpLength}
										error={errors.userId}
										touched={touched.userId}
									/>
								</div>
								<div className="tw-flex tw-gap-4">
									<Button
										style='dismiss'
										text='cancel'
										className='tw-flex-1 tw-py-6 tw-font-semibold tw-text-xl'
										onClick={handleAbort}
									/>
									<Button
										style='confirm'
										text='confirm'
										className='tw-flex-1 tw-py-6 tw-font-semibold tw-text-xl'
										onClick={handleSubmit}
										type="submit"
										disabled={isSubmitting || (!isValid && isAllTouched)}
									/>
								</div>
							</Form>
						)
					}}
				</Formik>
				<p className="tw-font-bold tw-text-[44px] tw-text-[#434A54] tw-uppercase tw-text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
			</div>
		</>
	)
}

export default OTPForm