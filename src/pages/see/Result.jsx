import { QRCode } from 'react-qrcode-logo'
import qrLogo from '../../assets/icons/qr-logo.svg'
import logo from '../../assets/logo.svg'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const Result = ({ qrUrl }) => {
	const navigate = useNavigate()
	const handleClick = () => {
		navigate('/')
	}

	return (
		<div className="tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-h-full">
			<div><img src={logo} alt="logo" className='w-20 h-20' /></div>
			<div className='tw-bg-gradient-to-r tw-from-white tw-to-[#EFF8FF] tw-rounded-3xl tw-p-10 tw-flex tw-flex-col tw-items-center'>
				<p className='tw-uppercase tw-tracking-[.75em] tw-text-5xl tw-font-extrabold tw-mb-8'>scan</p>
				<p className='tw-text-2xl tw-font-semibold tw-mb-8'>Get your personalized summary here:</p>
				<QRCode
					value={qrUrl}
					logoImage={qrLogo}
					bgColor='transparent'
					fgColor='#09101D'
					removeQrCodeBehindLogo={true}
					qrStyle='dots'
					eyeRadius={10}
					size={222}
				/>
				<p className='tw-uppercase tw-mt-11 tw-text-5xl tw-font-bold'>thank you!</p>
			</div>
			<Button
				className='tw-py-6 tw-w-full tw-font-semibold tw-text-xl'
				style='confirm'
				text='main menu'
				onClick={handleClick}
			/>
		</div>
	)
}

export default Result