import { Modal } from "react-bootstrap"
import Button from "./Button"

const ExitDialog = ({ isOpen, onConfirmNav, onCancelNav, question }) => {
	return (
		<Modal
			show={isOpen}
			centered
		>
			<Modal.Body>
				<div className="tw-flex tw-flex-col tw-gap-9">
					<div className="tw-text-center">
						<p className="tw-text-3xl tw-font-bold tw-mb-6">{question}</p>
						<p className="tw-text-2xl tw-font-medium">Any unsaved progress will be lost</p>
					</div>
					<div className="tw-flex tw-gap-4">
						<Button className='tw-flex-1 tw-py-3 tw-font-semibold' style='dismiss' text='Stop Scanning' onClick={onConfirmNav} />
						<Button className='tw-flex-1 tw-py-3 tw-font-semibold' style='confirm' text='Continue Scanning' onClick={onCancelNav} />
					</div>
				</div>
			</Modal.Body>

		</Modal>
	)
}

export default ExitDialog