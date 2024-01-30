import ColorButton from "../../../components/Button"
import play from '../../../assets/icons/play.svg'
import pause from '../../../assets/icons/pause.svg'
import restart from '../../../assets/icons/restart.svg'

const setButtonsInnerHTML = (icon, text) => {
	return (
		<div className='tw-flex tw-justify-center tw-gap-4'>
			<img src={icon} alt={`${text} icon`} />
			<span className='tw-uppercase'>{text}</span>
		</div>
	)
}

const ScanControls = ({ onStart, onPause, onRestart, isScanning, isInitialised }) => {

	const render = () => {
		if (isScanning && isInitialised) {
			return (
				<>
					<Button text={setButtonsInnerHTML(pause, 'pause')} onClick={onPause} />
					<Button text={setButtonsInnerHTML(restart, 'restart')} onClick={onRestart} />
				</>
			)
		} else if (!isScanning && isInitialised) {
			return (
				<>
					<PlayButton onClick={onStart} text={setButtonsInnerHTML(play, 'start')} />
					<Button text={setButtonsInnerHTML(restart, 'restart')} onClick={onRestart} />
				</>
			)
		} else {
			return <PlayButton onClick={onStart} text={setButtonsInnerHTML(play, 'start')} />
		}
	}

	return (
		<div className="tw-flex tw-w-full tw-gap-4 tw-box-content">
			{render()}
		</div>
	)
}

const PlayButton = (props) => {
	return <ColorButton
		style='confirm'
		className='tw-flex-1 tw-py-6 tw-text-xl tw-font-semibold'
		{...props}
	/>
}

const Button = ({ text, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='tw-flex-1 tw-py-[22px] tw-text-xl tw-font-semibold tw-border-2 tw-border-[#09101D] tw-rounded-3xl'
		>
			{text}
		</button>
	)
}

export default ScanControls