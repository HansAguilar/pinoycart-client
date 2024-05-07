import axios from "axios"
import { LOCAL_URL, PROD_URL } from "./url";

export const addItemApi = async (items: any) => {
	const token = localStorage.getItem("token");

	try {
		const response = await axios.post(`${PROD_URL}/add-item`, items, {
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
		const response = await axios.patch(`${PROD_URL}/update-item`,
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
		const response = await axios.get(`${PROD_URL}/get-item/${itemID}`,
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
		const response = await axios.post(`${PROD_URL}/delete-item`,
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


export const addReviewAPI = async (data: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.post(`${PROD_URL}/add-review`,
			{ data },
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


export const fetchAllItemsAPI = async () => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.get(`${PROD_URL}/get-items`,
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