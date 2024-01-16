import info from '../../../assets/icons/info.svg'
import success from '../../../assets/icons/success.svg'
import FaceScanProgress from './FaceScanProgress'
import FaceStats from './FaceStats'

const VisualScanner = ({ data, stage, facemap, landmarks, mesh }) => {

	return (
		<div className='tw-flex-1 tw-flex tw-items-center'>
			<div className='column-1/3 tw-flex tw-flex-col tw-gap-14 tw-justify-center tw-items-between tw-px-16'>
				{!!stage && data && <FaceStats data={data} />}
			</div>
			<div className='tw-flex-1 tw-flex tw-flex-col tw-self-end tw-items-center tw-pb-10 column-1/3'>
				<p className='tw-bg-white tw-rounded-full tw-py-3 tw-px-4 tw-flex tw-gap-3'>
					<img src={data?.in_roi ? success : info} alt="info icon" className='w-8 h-8' />
					<span className='tw-text-xl'>{data?.message || 'Your face must be inside the frame'}</span>
				</p>
			</div>
			<div className='column-1/3 tw-flex tw-flex-col tw-gap-14 tw-justify-center tw-items-between tw-px-16'>
				{!!stage && data && <FaceScanProgress stage={stage} marks={landmarks} facemap={facemap} mesh={mesh} />}
			</div>
		</div>
	)
}

export default VisualScanner