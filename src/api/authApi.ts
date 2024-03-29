import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

export const loginAPI = async (credentials: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/user/login`, credentials);
		return response;
	}

	catch (error: any) {
		return error.response.data;
	}
};


export const verifyAPI = async (token: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/user/verify-token`, { token: token });
		return response.data.data;
	}

	catch (error: any) {
		return error.response.data;
	}
}
