import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

export const addItemApi = async (items: any) => {
	const token = localStorage.getItem("token");

	console.log("items: " ,items)
	try {
		const response = await axios.post(`${BASE_URL}/add-item`, items, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			}

		});
		return response;
	}

	catch (error: any) {
		console.log(error)
		return error.response.data;
	}
};


export const updateItemByIDAPI = async (formdata: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.patch(`${BASE_URL}/update-item`,
			formdata,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				}
			});
		return response;
	}

	catch (error: any) {
		console.log(error);
		return error.response.data;
	}
};


export const getItemByIDAPI = async (itemID: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.get(`${BASE_URL}/get-item/${itemID}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
		return response;
	}

	catch (error: any) {
		console.log(error);
		return error.response.data;
	}
};


export const deleteItemByIDAPI = async (itemID: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.post(`${BASE_URL}/delete-item`,
			{ itemID: itemID },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
		return response;
	}

	catch (error: any) {
		console.log(error);
		return error.response.data;
	}
};