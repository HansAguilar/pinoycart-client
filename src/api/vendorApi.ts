import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

export const createVendorApi = async (credentials: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.post(`${BASE_URL}/create-vendor`, credentials, {
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


export const getVendorByID = async (vendorID: string) => {
	const token = localStorage.getItem("token");
	
	try {
		const response = await axios.post(`${BASE_URL}/get-vendor`, { vendorID: vendorID }, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		return response.data;
	}

	catch (error: any) {
		return error.response.data;
	}
};


export const UpdateBanner = async (image: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.patch(`${BASE_URL}/update-vendor-banner`, image, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		return response.data;
	}

	catch (error: any) {
		return error.response.data;
	}
}

export const UpdateVendorInfo = async (credentials: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.patch(`${BASE_URL}/update-vendor`, credentials, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		return response.data;
	}

	catch (error: any) {
		return error.response.data;
	}
}