import playIcon from '../../../assets/icons/play.svg'
import backImg from '../../../assets/img/back-scenario.jpg'
import frontImg from '../../../assets/img/front-scenario.jpg'
import Button from '../../../components/Button'

const ScenarioChoice = ({ onChoose }) => {

	return (
		<div>
			<h1 className="tw-text-[32px] tw-font-bold tw-text-center">INSTRUCTIONS FOR USE</h1>
			<p className='tw-text-xl tw-text-[#434A54] tw-text-center'>Please answer the following questions to assist in your medical scan.<br />If you do not recall, please select NO</p>
			<div className='tw-mt-9 tw-flex tw-flex-col tw-gap-6'>
				<Scenario scenario="only_front" onChoose={onChoose} />
				<Scenario scenario="front_and_back" onChoose={onChoose} />
			</div>
		</div>
	)
}

const Scenario = ({ scenario, onChoose }) => {
	const imagePath = scenario === 'only_front' ? frontImg : backImg
	const title = scenario === 'only_front' ? 'Only Front side scanning' : 'Front and Back side scanning'
	const buttonInnerHTML = <div className='tw-flex tw-gap-4'>
		<img src={playIcon} alt="play icon" />
		<span className='tw-uppercase'>select</span>
	</div>

	return (
		<div className='tw-flex tw-gap-6'>
			{/* <div className='tw-flex-grow'></div> */}
			<div className='tw-relative tw-pr-[25%]'>
				<img src={imagePath} alt="scanning points"
					className='tw-absolute tw-top-0 tw-w-full tw-h-full tw-object-cover'
				/>
			</div>
			<div className='tw-py-6 tw-pr-6  tw-flex tw-flex-col tw-items-start'>
				<h2 className='tw-text-[28px] tw-font-semibold tw-mb-3'>{title}</h2>
				<p className='tw-text-lg tw-mb-6'>The App will now guide the clinician through {scenario === 'only_front' ? 'front' : 'back'} side scanning, collecting data for 30 seconds at a time at selected body sites</p>
				<Button style='confirm' className='tw-py-5 tw-px-[53px]' onClick={() => onChoose(scenario)} text={buttonInnerHTML} />
			</div>
		</div>
	)
}

export default ScenarioChoice