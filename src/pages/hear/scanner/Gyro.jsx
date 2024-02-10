import frontGyro from '../../../assets/icons/front-gyro.svg'
import sideGyro from '../../../assets/icons/side-gyro.svg'
import GyroElement from './GyroElement'

const Gyro = () => {

	return (
		<div className='tw-flex tw-justify-center tw-gap-[60px] tw-p-6 tw-rounded-3xl tw-bg-gradient-to-l tw-from-[rgba(239,248,255,0.70)] tw-from-[10.38%] tw-to-[rgba(255,255,255,0.63)] tw-to-[94.42%]'>
			<GyroElement title="Front" image={frontGyro} name="front" />
			<GyroElement title="Side" image={sideGyro} name="side" />
		</div>
	)
}

export default Gyro