import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

export const addItemApi = async (items: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/add-item`, items, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			}

		});
		return response;
	}

	catch (error: any) {
		return error.response.data;
	}
};