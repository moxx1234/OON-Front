import image from '../../../assets/img/deviceNum.jpg'
import Button from '../../../components/Button'

const DeviceNumberHint = ({ onClose }) => {
	return (
		<div className='tw-flex tw-flex-col tw-gap-9 tw-rounded-3xl tw-p-9 tw-bg-gradient-to-r tw-from-[rgba(255,255,255,0.9)] tw-to-[#EFF8FF] tw-items-center'>
			<h2 className='tw-font-bold tw-text-[32px]'>Device Number</h2>
			<div className='tw-flex tw-gap-9'>
				<div className='tw-flex-grow tw-basis-1/2 tw-relative'>
					<img src={image} alt="where to find device number" className='tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-object-contain' />
				</div>
				<div className='tw-flex-grow tw-basis-1/2 tw-flex tw-flex-col tw-gap-4 tw-text-[26px]'>
					<p>Examine the physical exterior of your device for a label or sticker </p>
					<p>The 6-digit device number is commonly printed on this label, which is usually located on the back, bottom, or sides of the device</p>
				</div>
			</div>
			<Button onClick={onClose} style='dismiss' text='close' className='tw-font-semibold tw-uppercase tw-text-xl tw-self-stretch tw-py-6' />
		</div>
	)
}

export default DeviceNumberHint