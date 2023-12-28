import { Modal } from "react-bootstrap"
import Button from "./Button"

const ExitDialog = ({ isOpen, onConfirmNav, onCancelNav }) => {
	return (
		<Modal
			show={isOpen}
			centered
		>
			<Modal.Body>
				<div className="flex flex-col gap-9">
					<div className="text-center">
						<p className="text-3xl font-bold mb-6">Are you sure you want to stop the scanning process?</p>
						<p className="text-2xl font-medium">Any unsaved progress will be lost</p>
					</div>
					<div className="flex gap-4">
						<Button className='flex-1 py-3 font-semibold' type='dismiss' text='Stop Scanning' onClick={onConfirmNav} />
						<Button className='flex-1 py-3 font-semibold' type='confirm' text='Continue Scanning' onClick={onCancelNav} />
					</div>
				</div>
			</Modal.Body>

		</Modal>
	)
}

export default ExitDialog