import React from 'react'
import StageProgress from './StageProgress'
import FaceCanvas from './FaceCanvas'

const stages = [null, 'Scanning points on the face', 'Creating a face map', 'Creating 3D face model']

const FaceScanProgress = ({ stage, marks, facemap }) => {
	return (
		<div className='flex flex-col gap-3'>
			<div className='bg-[#fff]/40 p-6 rounded-3xl text-center'>
				<StageProgress stage={stage} />
			</div>
			<div className='bg-[#fff]/40 p-6 rounded-3xl text-center'>
				<div className='h-80'>
					<FaceCanvas landmarks={marks} facemap={facemap} stage={stage} />
				</div>
				<p>{stages[stage]}</p>
			</div>
		</div>
	)
}

export default FaceScanProgress