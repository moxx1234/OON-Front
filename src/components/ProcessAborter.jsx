import cross from '../assets/icons/cross.svg'

const ProcessAborter = ({ text, onClick }) => {
	return (
		<button onClick={onClick} className='absolute left-0 top-10 bg-white py-3 px-4 rounded-r-full uppercase flex items-center gap-3 text-xl font-semibold'>
			<span>{text}</span>
			<img src={cross} alt="close" className='object-fill' />
		</button>
	)
}

export default ProcessAborter