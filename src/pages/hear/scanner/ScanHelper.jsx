import frontImg from '../../../assets/img/front-instruction.jpg'
import backImg from '../../../assets/img/back-instruction.jpg'
import { ScanContext } from '../context/ScannerProvider'
import { useContext } from 'react'

const ScanHelper = () => {
	const { status } = useContext(ScanContext)
	const { scenario } = status

	return (
		<div className='tw-flex tw-flex-1 tw-gap-3'>
			{scenario === 'only_front' ?
				<>
					<div className='tw-relative tw-flex-1'>
						<img src={frontImg} alt="" className='tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-object-contain' />
					</div>
				</>
				:
				<>
					<div className='tw-relative tw-flex-1'>
						<img src={frontImg} alt="" className='tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-object-contain' />
					</div>
					<div className='tw-relative tw-flex-1'>
						<img src={backImg} alt="" className='tw-absolute tw-w-full tw-h-full tw-top-0 tw-left-0 tw-object-contain' />
					</div>
				</>}
		</div>
	)
}

export default ScanHelper