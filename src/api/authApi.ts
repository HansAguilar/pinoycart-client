import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

export const loginAPI = async (credentials: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/user/login`, credentials, {
			withCredentials: true
		});
		return response;
	}

	catch (error: any) {
		return error.response.data;
	}
};


export const verifyAPI = async (credentials: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/user/verify-token`, { token: credentials }, {
			withCredentials: true
		});
		return response.data.message;
	}

	catch (error: any) {
		return error.response.data;
	}
}
