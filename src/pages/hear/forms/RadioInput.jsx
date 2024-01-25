import React from 'react'

const RadioInput = ({ name, value, checked, onChange }) => {
	return (
		<label className='custom-radio'>
			{value}
			<input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
			<span></span>
		</label>
	)
}

export default RadioInput