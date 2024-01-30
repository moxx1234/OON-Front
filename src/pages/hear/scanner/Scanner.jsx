import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import CenteredWrapper from '../components/CenteredWrapper'
import DeviceInstruction from './DeviceInstruction'
import ScanProcess from './ScanProcess'
import ScenarioChoice from './ScenarioChoice'

const Scanner = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [scenario, setScenario] = useState()

	const handleChoose = (chosenScenario) => {
		setScenario(chosenScenario)
		navigate(location.pathname, { state: 'scanProccess' })
	}

	const renderComponent = () => {
		switch (location.state) {
			case 'deviceInstruction': return <CenteredWrapper animDuration={0.15} key={location.state}><DeviceInstruction /></CenteredWrapper>
			case 'scenarioChoice': return <CenteredWrapper animDuration={0.15} key={location.state}><ScenarioChoice onChoose={handleChoose} /></CenteredWrapper>
			case 'scanProccess': return <ScanProcess scenario={scenario} />
			default: alert('invalid location state!')
		}
	}

	return (
		<AnimatePresence mode='wait'>
			{renderComponent()}
		</AnimatePresence>
	)
}

export default Scanner