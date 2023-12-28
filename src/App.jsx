import { Route, Routes, useLocation } from "react-router-dom"
import VideoRenderer from "./components/VideoRenderer"
import Menu from "./pages/menu/Menu"
import MachineVision from "./pages/see/MachineVision"

const App = () => {
	const location = useLocation()
	return (
		<div className="w-full h-full relative flex items-center justify-center">
			<VideoRenderer location={location} />
			<Routes location={location} key={location.pathname}>
				<Route index element={<Menu />} />
				<Route path="/see" element={<MachineVision />} />
			</Routes>
		</div>
	)
}

export default App