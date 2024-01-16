import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import Header from "../../components/Header"
import ExitDialog from "../../components/ExitDialog"

const Vibrome = () => {
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
			<Header process='Vibrome' abort={handleAbort} />
			<ExitDialog isOpen={isModalOpen} onConfirmNav={handleConfirmAbort} onCancelNav={handleCancelAbort} />
			<Outlet />
		</>
	)
}

export default Vibrome