import playIcon from '../../../assets/icons/play.svg'
import backImg from '../../../assets/img/back-scenario.jpg'
import frontImg from '../../../assets/img/front-scenario.jpg'
import Button from '../../../components/Button'

const ScenarioChoice = ({ onChoose }) => {

	return (
		<>
			<h1 className="tw-text-[32px] tw-font-bold tw-text-center">Select scanning areas</h1>
			<div className='tw-mt-9 tw-flex tw-flex-col tw-gap-6'>
				<Scenario scenario="only_front" onChoose={onChoose} />
				<Scenario scenario="front_and_back" onChoose={onChoose} />
			</div>
		</>
	)
}

const Scenario = ({ scenario, onChoose }) => {
	const imagePath = scenario === 'only_front' ? frontImg : backImg
	const title = scenario === 'only_front' ? 'Front (anterior) ONLY.' : 'Front (anterior) and Back (posterior).'
	const buttonInnerHTML = <div className='tw-flex tw-gap-4'>
		<img src={playIcon} alt="play icon" />
		<span className='tw-uppercase'>select</span>
	</div>

	return (
		<div className='tw-flex tw-gap-6'>
			<div className='tw-relative tw-pr-[25%]'>
				<img src={imagePath} alt="scanning points"
					className='tw-absolute tw-top-0 tw-w-full tw-h-full tw-object-cover'
				/>
			</div>
			<div className='tw-py-6 tw-pr-6  tw-flex tw-flex-col tw-items-start'>
				<h2 className='tw-text-[28px] tw-font-semibold tw-mb-16'>{title}</h2>
				<Button style='confirm' className='tw-py-5 tw-px-[53px]' onClick={() => onChoose(scenario)} text={buttonInnerHTML} />
			</div>
		</div>
	)
}

export default ScenarioChoice