import axios from "axios"
import { io } from 'socket.io-client'

const URL = process.env.REACT_APP_BACKEND_URL

export const getData = async (stage) => {
	return axios.post(`${URL}/api/data`, {
		stage
	}).catch(err => console.error('Catched error: ', err))
}

export const getVideo = async () => {
	return axios.get(`${URL}/api/stream`, {
		headers: {
			'Content-Type': 'multipart/x-mixed-replace'
		}
	})
		.catch(err => console.error(err))
}

export const socket = io(URL, {
	autoConnect: false
})