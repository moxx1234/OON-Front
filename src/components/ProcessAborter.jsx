import cross from '../assets/icons/cross.svg'

const ProcessAborter = ({ text, onClick }) => {
	return (
		<button onClick={onClick} className='tw-bg-white tw-py-3 tw-px-4 tw-rounded-r-xl tw-flex tw-items-center tw-gap-3 tw-text-xl tw-font-semibold'>
			<span>{text}</span>
			<img src={cross} alt="close" className='tw-object-fill' />
		</button>
	)
}

export default ProcessAborter