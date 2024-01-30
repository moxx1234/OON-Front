import check from '../../../assets/icons/checkmark-fill-white.svg'

const ScanPoint = ({ pointNumber, stage }) => {
	return (
		<>
			{stage <= pointNumber ? (
				<div className='tw-font-bold tw-bg-[#FD3FD3] tw-p-6 tw-rounded-full tw-aspect-square tw-w-[90px] tw-flex tw-items-center tw-justify-center tw-leading-none tw-shadow-[0_0_0px_40px_rgba(253,63,211,0.40)] tw-relative'>
					<p className='tw-text-white tw-text-[40px]'>{pointNumber + 1}</p>
				</div>
			) : (
				<div className='tw-rounded-full tw-aspect-square tw-w-[68px] tw-bg-[#07BB4F] tw-flex tw-justify-center tw-items-center'>
					<img src={check} alt='success icon' />
				</div>
			)
			}
		</>
	)
}

export default ScanPoint