import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

const token = localStorage.getItem("token");

export const createVendorApi = async (credentials: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/create-vendor`, credentials, {
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


export const getVendorByID = async (vendorID: string) => {
	try {
		const response = await axios.post(`${BASE_URL}/get-vendor`, { vendorID: vendorID }, {
			withCredentials: true,
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
	try {
		const response = await axios.patch(`${BASE_URL}/update-vendor-banner`, image, {
			withCredentials: true,
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
	try {
		const response = await axios.patch(`${BASE_URL}/update-vendor`, credentials, {
			withCredentials: true,
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