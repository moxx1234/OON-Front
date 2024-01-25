import { Route, Routes, useLocation } from "react-router-dom"
import VideoRenderer from "./components/VideoRenderer"
import Layout from "./pages/hear/Layout"
import OTPForm from "./pages/hear/forms/OTPForm"
import Questionnaire from "./pages/hear/questionnaire/Questionnaire"
import Menu from "./pages/menu/Menu"
import MachineVision from "./pages/see/MachineVision"
import Scanner from "./pages/hear/scanner/Scanner"

const App = () => {
	const location = useLocation()
	return (
		<div className="tw-w-full tw-h-full tw-relative tw-flex tw-flex-col tw-flex-1">
			<VideoRenderer location={location} />
			<Routes location={location} key={location.pathname}>
				<Route index element={<Menu />} />
				<Route path="/see" element={<MachineVision />} />
				<Route path="/hear" element={<Layout />} >
					<Route index element={<OTPForm />} />
					<Route path="questionnaire" element={<Questionnaire />} />
					<Route path="scanner" element={<Scanner />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App