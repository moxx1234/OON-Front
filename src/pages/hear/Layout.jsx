import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import Header from "../../components/Header"
import ExitDialog from "../../components/ExitDialog"

const Layout = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	// abort process handlers
	const handleAbort = () => {
		setIsModalOpen(true)
	}
	const handleConfirmAbort = () => {
		navigate('/')
	}
	const handleCancelAbort = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<Header process='Vibrome&#8482; biosignatures	' abort={handleAbort} />
			<ExitDialog
				isOpen={isModalOpen}
				onConfirmNav={handleConfirmAbort}
				onCancelNav={handleCancelAbort}
				question='Are you sure you want to stop the VIBROME process?'
			/>
			<Outlet />
		</>
	)
}

export default Layout