import { Route, Routes, useLocation } from "react-router-dom"
import VideoRenderer from "./components/VideoRenderer"
import Menu from "./pages/menu/Menu"
import MachineVision from "./pages/see/MachineVision"
import Vibrome from "./pages/hear/Vibrome"
import OTPForm from "./pages/hear/components/forms/OTPForm"

const App = () => {
	const location = useLocation()
	return (
		<div className="tw-w-full tw-h-full tw-relative tw-flex tw-flex-col">
			<VideoRenderer location={location} />
			<Routes location={location} key={location.pathname}>
				<Route index element={<Menu />} />
				<Route path="/see" element={<MachineVision />} />
				<Route path="/hear" element={<Vibrome />} >
					<Route index element={<OTPForm />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App