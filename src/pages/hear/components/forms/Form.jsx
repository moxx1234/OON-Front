import React from 'react'

const Form = ({ children }) => {
	return (
		<form className="tw-bg-gradient-to-r tw-from-white tw-to-[#EFF8FF] tw-p-9 tw-rounded-3xl">
			{children}
		</form>
	)
}

export default Form