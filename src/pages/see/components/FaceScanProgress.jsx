import React from 'react'
import StageProgress from './StageProgress'
import FaceCanvas from './FaceCanvas'
import FaceMesh3d from './FaceMesh3d'

const stages = [null, 'Scanning points on the face', 'Creating a face map', 'Creating 3D face model']

const FaceScanProgress = ({ stage, marks, facemap, mesh }) => {
	return (
		<div className='flex flex-col gap-3'>
			<div className='bg-[#fff]/40 p-6 rounded-3xl text-center'>
				<StageProgress stage={stage} />
			</div>
			<div className='bg-[#fff]/40 p-6 rounded-3xl text-center'>
				<div className='h-80'>
					{stage < 3 ?
						<FaceCanvas landmarks={marks} facemap={facemap} stage={stage} />
						: <FaceMesh3d points={mesh} />
					}
				</div>
				<p>{stages[stage]}</p>
			</div>
		</div>
	)
}

export default FaceScanProgress