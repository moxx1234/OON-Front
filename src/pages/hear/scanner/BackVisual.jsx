import backImg from '../../../assets/img/back-scan.jpg'
import ScanPoint from './ScanPoint'
import { Fragment } from 'react'

const BackVisual = ({ stage, totalStages }) => {
	return (
		<div className='tw-rounded-3xl tw-overflow-hidden tw-border-2 tw-border-[#09101D] tw-relative tw-flex-1'>
			<img
				className='tw-absolute tw-top-0 tw-w-full tw-h-[130%] tw-object-cover'
				src={backImg}
				alt="front side scan map"
			/>
			<div className='back-dots-list'>
				{new Array(totalStages).fill(null).map((_, index) => (
					stage >= index && (
						<Fragment key={index}>
							<ScanPoint pointNumber={index} stage={stage} />
						</Fragment>
					)
				))}
			</div>
		</div>
	)
}

export default BackVisual