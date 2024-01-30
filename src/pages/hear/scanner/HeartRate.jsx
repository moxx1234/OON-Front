

const HeartRate = ({ rate, variability }) => {
	return (
		<div className='tw-text-[#222] tw-flex tw-flex-col tw-gap-4 tw-p-6 tw-rounded-3xl tw-bg-gradient-to-l tw-from-[rgba(239,248,255,0.70)] tw-from-[10.38%] tw-to-[rgba(255,255,255,0.63)] tw-to-[94.42%]'>
			<div className='tw-flex tw-gap-4 tw-items-center'>
				<p className='tw-font-bold tw-text-[76px] tw-leading-[100%] tw-basis-[36%] tw-text-end'>{rate || '-'}</p>
				<div>
					<p className='tw-mb-[7px]'>/min</p>
					<p className='tw-font-bold'>HEART RATE</p>
				</div>
			</div>
			<div className='tw-flex tw-gap-4 tw-items-center'>
				<p className='tw-font-bold tw-text-[60px] tw-leading-[100%] tw-basis-[36%] tw-text-end'>{variability || '-'}</p>
				<div>
					<p className='tw-mb-[7px]'>/msec</p>
					<p className='tw-font-bold'>HEART RATE VARIABILITY</p>
				</div>
			</div>
		</div>
	)
}

export default HeartRate