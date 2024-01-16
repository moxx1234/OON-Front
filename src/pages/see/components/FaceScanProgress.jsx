import React from 'react'
import StageProgress from './StageProgress'
import FaceCanvas from './FaceCanvas'
import FaceMesh3d from './FaceMesh3d'

const stages = [null, 'Scanning points on the face', 'Creating a face map', 'Creating 3D face model']

const FaceScanProgress = ({ stage, marks, facemap, mesh }) => {
	return (
		<div className='tw-flex tw-flex-col tw-gap-3'>
			<div className='tw-bg-[#fff]/40 tw-p-6 tw-rounded-3xl tw-text-center'>
				<StageProgress stage={stage} />
			</div>
			<div className='tw-bg-[#fff]/40 tw-p-6 tw-rounded-3xl tw-text-center'>
				<div className='tw-h-80'>
					<FaceCanvas landmarks={marks} facemap={facemap} stage={stage} />
					{/* {stage < 3 ?
						<FaceCanvas landmarks={marks} facemap={facemap} stage={stage} />
						: <FaceMesh3d points={mesh} />
					} */}
				</div>
				<p>{stages[stage]}</p>
			</div>
		</div>
	)
}

export default FaceScanProgress