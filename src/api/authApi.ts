import axios from "axios"

const BASE_URL = "https://pinoycart-server.vercel.app/api/v1";

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
};


export const getUserByIdAPI = async (userID: string) => {
	try {
		const response = await axios.post(`${BASE_URL}/get-user`, { userID: userID });
		return response.data.data;
	}

	catch (error: any) {
		return error.response.data;
	}
}
