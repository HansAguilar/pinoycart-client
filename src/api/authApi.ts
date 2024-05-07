import axios from "axios"
import { LOCAL_URL, PROD_URL } from "./url";


export const loginAPI = async (credentials: any) => {
	try {
		const response = await axios.post(`${PROD_URL}/user/login`, credentials);
		return response;
	}

	catch (error: any) {
		return error.response.data;
	}
};


export const verifyAPI = async (token: any) => {
	try {
		const response = await axios.post(`${PROD_URL}/user/verify-token`, { token: token });
		return response.data.data;
	}

	catch (error: any) {
		return error.response.data;
	}
};


export const getUserByIdAPI = async (userID: string) => {
	try {
		const response = await axios.post(`${PROD_URL}/get-user`, { userID: userID });
		return response.data.data;
	}

	catch (error: any) {
		return error.response.data;
	}
}
