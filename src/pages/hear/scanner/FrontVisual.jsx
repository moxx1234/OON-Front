import { Fragment } from 'react'
import frontImg from '../../../assets/img/front-scan.jpg'
import ScanPoint from './ScanPoint'

const FrontVisual = ({ stage, totalStages }) => {

	return (
		<div className='tw-rounded-3xl tw-overflow-hidden tw-border-2 tw-border-[#09101D] tw-relative tw-flex-1'>
			<img
				className='tw-absolute tw-bottom-0 tw-w-full tw-h-[130%] tw-object-cover tw-object-bottom'
				src={frontImg}
				alt="front side scan map"
			/>
			<div className='front-dots-list'>
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


export default FrontVisual