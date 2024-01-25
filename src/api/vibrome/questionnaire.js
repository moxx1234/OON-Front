import axios from "axios"

const URL = process.env.REACT_APP_BACKEND_URL

export const submitQuestionnaire = async (body) => {
	return await axios.post(`${URL}/api/vibrome/questionnaire`, body)
		.catch(error => { throw error })
}