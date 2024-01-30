import { useField } from 'formik'
import RadioInput from './RadioInput'

const RadioFieldSet = ({ label, name }) => {
	const [field, meta, helpers] = useField(name)

	const handleChange = (e) => {
		helpers.setTouched(true)
		helpers.setValue(e.target.value === 'yes' ? true : false)
	}

	return (
		<div className='tw-flex tw-justify-between tw-items-center tw-text-lg tw-font-medium tw-p-4 tw-border tw-border-[#D5DDE3] tw-rounded-[20px]'>
			{label}
			<fieldset className='tw-flex tw-gap-3 tw-ml-4'>
				<RadioInput name={name} value="yes" checked={field.value === true} onChange={handleChange} />
				<RadioInput name={name} value="no" checked={field.value === false} onChange={handleChange} />
			</fieldset>
		</div>
	)
}

export default RadioFieldSet