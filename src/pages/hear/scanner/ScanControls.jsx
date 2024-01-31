import { useContext } from "react"
import pause from '../../../assets/icons/pause.svg'
import play from '../../../assets/icons/play.svg'
import restart from '../../../assets/icons/restart.svg'
import ColorButton from "../../../components/Button"
import { ScanContext } from "../context/ScannerProvider"

const setButtonsInnerHTML = (icon, text) => {
	return (
		<div className='tw-flex tw-justify-center tw-gap-4'>
			<img src={icon} alt={`${text} icon`} />
			<span className='tw-uppercase'>{text}</span>
		</div>
	)
}

const ScanControls = () => {
	const { controls, status } = useContext(ScanContext)

	const render = () => {
		if (status.isScanning && status.hasStarted) {
			return (
				<>
					<Button text={setButtonsInnerHTML(pause, 'pause')} onClick={controls.stop} />
					<Button text={setButtonsInnerHTML(restart, 'restart')} onClick={controls.restart} />
				</>
			)
		} else if (!status.isScanning && status.hasStarted) {
			return (
				<>
					<PlayButton onClick={controls.start} text={setButtonsInnerHTML(play, 'start')} />
					<Button text={setButtonsInnerHTML(restart, 'restart')} onClick={controls.restart} />
				</>
			)
		} else {
			return <PlayButton onClick={controls.start} text={setButtonsInnerHTML(play, 'start')} />
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