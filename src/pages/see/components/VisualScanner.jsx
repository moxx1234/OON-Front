import info from '../../../assets/icons/info.svg'
import success from '../../../assets/icons/success.svg'
import logo from '../../../assets/logo.svg'
import FaceScanProgress from './FaceScanProgress'
import FaceStats from './FaceStats'

const VisualScanner = ({ data, stage, facemap, landmarks, mesh }) => {

	return (
		<div className='h-full w-full flex items-center'>
			<div className='column-1/3 flex flex-col gap-14 justify-center items-between px-16'>
				{!!stage && data && <FaceStats data={data} />}
			</div>
			<div className='h-full flex flex-col justify-between items-center py-10 column-1/3'>
				<img src={logo} alt="logo" className='w-16 h-16' />
				<p className='bg-white rounded-full py-3 px-4 flex gap-3'>
					<img src={data?.in_roi ? success : info} alt="info icon" className='w-8 h-8' />
					<span className='text-xl'>{(data?.in_roi && data?.message) || 'Your face must be inside the frame'}</span>
				</p>
			</div>
			<div className='column-1/3 flex flex-col gap-14 justify-center items-between px-16'>
				{!!stage && data && <FaceScanProgress stage={stage} marks={landmarks} facemap={facemap} mesh={mesh} />}
			</div>
		</div>
	)
}

export default VisualScanner