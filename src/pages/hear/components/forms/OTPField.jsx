import { useField } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import hintIcon from '../../../../assets/icons/hint.svg'

const OTPField = ({ name, otpLength, error, touched, label, Hint }) => {
	const [isHintOpen, setIsHintOpen] = useState(false)
	const [otp, setOtp] = useState(new Array(otpLength).fill(''))
	const [isFocusSet, setIsFocusSet] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const inputRef = useRef(null)
	const [field, meta, helpers] = useField(name)

	useEffect(() => {
		const inputs = inputRef.current.querySelectorAll('input')
		if (activeIndex >= 0 && activeIndex < otpLength && isFocusSet) inputs[activeIndex].focus()
	}, [activeIndex, isFocusSet])

	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/g, '').split('')
		const newOtp = [...otp]

		if (!value.length) {
			newOtp[index] = ''
			setActiveIndex(index - 1)
		}
		else {
			value.forEach((digit, idx) => {
				if (index + idx >= otpLength) return
				newOtp[index + idx] = digit
				setActiveIndex(index + idx)
			})
		}
		setOtp(newOtp)
		helpers.setValue(newOtp.join(''))
	}

	return (
		<>
			{!!Hint && <Modal
				show={isHintOpen}
				onHide={() => setIsHintOpen(false)}
				centered
				size='xl'
				dialogClassName='tw-w-[868px]'
			>
				<Hint onClose={() => setIsHintOpen(false)} />
			</Modal>}
			<div className='tw-p-[16px] tw-border-[#D5DDE3] tw-border tw-rounded-[20px] tw-flex tw-flex-col tw-items-center'>
				<div className='tw-mb-6 tw-flex tw-items-center tw-gap-4'>
					<label className='tw-text-[28px] tw-font-semibold'>{label}: </label>
					<a onClick={() => setIsHintOpen(true)}>{!!Hint && <img src={hintIcon} />}</a>
				</div>
				<div className='tw-flex tw-justify-center tw-gap-3' ref={inputRef}>
					{otp.map((digit, index) => (
						<input
							key={index}
							type="text"
							inputMode="numeric"
							pattern="\d{1}"
							value={digit}
							className={`tw-w-[76px] tw-h-[76px] tw-rounded-3xl tw-bg-white tw-border tw-focus:outline-none tw-focus:border-black tw-focus:ring tw-focus:ring-[#09101D] tw-text-2xl tw-text-center tw-font-semibold tw-spin-button-none ${!!error && touched ? 'tw-border-[#EC2D30]' : 'tw-border-[#9BA7B1]'}`}
							onChange={(e) => handleChange(e, index)}
							onFocus={() => setIsFocusSet(true)}
						/>
					))}
				</div>
				{!!error && touched && <p className='tw-text-[#EC2D30] tw-pt-2'>{error}</p>}
			</div>
		</>
	)
}

export default OTPField