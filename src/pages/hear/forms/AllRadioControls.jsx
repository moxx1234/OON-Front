import RadioInput from './RadioInput'
import { useFormikContext } from 'formik'

const AllRadioControls = () => {
	const formikContext = useFormikContext()
	const handleAllChange = ({ target }) => {
		const allValue = target.value.replace(' to all', '') === 'yes' ? true : false
		const values = Object.keys(formikContext.initialValues).reduce((acc, field) => {
			formikContext.setFieldTouched(field, true, false)
			return { ...acc, [field]: allValue }
		}, {})
		formikContext.setErrors({})
		formikContext.setValues(values, false)
	}
	return (
		<fieldset className='radio-all tw-flex' onChange={handleAllChange}>
			<RadioInput name="all_radio" value="yes to all" />
			<RadioInput name="all_radio" value="no to all" />
		</fieldset>
	)
}

export default AllRadioControls