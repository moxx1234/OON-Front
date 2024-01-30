import frontGyro from '../../../assets/icons/front-gyro.svg'
import sideGyro from '../../../assets/icons/side-gyro.svg'

const Gyro = ({ front, side }) => {
	return (
		<div className='tw-flex tw-justify-center tw-gap-[60px] tw-p-6 tw-rounded-3xl tw-bg-gradient-to-l tw-from-[rgba(239,248,255,0.70)] tw-from-[10.38%] tw-to-[rgba(255,255,255,0.63)] tw-to-[94.42%]'>
			<div>
				<p className='tw-text-center tw-font-semibold tw-mb-3'>Front</p>
				<img src={frontGyro} alt="gyroscope" />
			</div>
			<div>
				<p className='tw-text-center tw-font-semibold tw-mb-3'>Side</p>
				<img src={sideGyro} alt="gyroscope" />
			</div>
		</div>
	)
}

export default Gyro