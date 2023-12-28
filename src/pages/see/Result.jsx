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
		<div className="flex flex-col items-center justify-evenly h-full">
			<div><img src={logo} alt="logo" className='w-20 h-20' /></div>
			<div className='bg-gradient-to-r from-white to-[#EFF8FF] rounded-3xl p-10 flex flex-col items-center'>
				<p className='uppercase tracking-[.75em] text-5xl font-extrabold mb-8'>scan</p>
				<p className='text-2xl font-semibold mb-8'>Get your personalized summary here:</p>
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
				<p className='uppercase mt-11 text-5xl font-bold'>thank you!</p>
			</div>
			<Button
				className='py-6 w-full font-semibold text-xl'
				type='confirm'
				text='main menu'
				onClick={handleClick}
			/>
		</div>
	)
}

export default Result