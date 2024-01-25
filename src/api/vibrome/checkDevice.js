import axios from "axios"

const URL = process.env.REACT_APP_BACKEND_URL

export const postDeviceData = async (data) => {
	return await axios.post(`${URL}/api/vibrome/check-device`, {
		device_id: Number(data.device_id),
		user_id: Number(data.user_id),
	})
		.then(result => result)
		.catch(error => { throw error })
}