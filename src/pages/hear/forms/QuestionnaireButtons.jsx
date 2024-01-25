import Button from "../../../../components/Button"

const QuestionnaireButtonsContent = ({ onSubmit, onCancel }) => {

	return (
		<>
			<Button style='dismiss' text="cancel" type="button" onClick={onCancel} />
			<Button style='confirm' text="confirm" type="submit" onClick={onSubmit} />
		</>
	)
}

export default QuestionnaireButtonsContent