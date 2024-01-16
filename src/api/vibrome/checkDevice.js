import axios from "axios"

const URL = process.env.REACT_APP_BACKEND_URL

export const postDeviceData = async (data) => {
	const { deviceNumber, userId } = data
	return await axios.post(`${URL}/api/vibrome/check-device`, {
		device_id: Number(deviceNumber),
		user_id: Number(userId),
	})
		.then(result => result)
		.catch(error => error)
}