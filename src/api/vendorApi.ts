import axios from "axios"

const BASE_URL = "https://pinoycart-server.vercel.app/api/v1";

export const createVendorApi = async (credentials: any) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.post(`${BASE_URL}/create-vendor`, credentials, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			}

		});
		console.log("response", response)
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

export const UpdateBannerAPI = async (image: File, vendorID: string) => {
	const token = localStorage.getItem("token");

	try {
		const formData = new FormData();
		formData.append('image', image);
		formData.append('vendorID', vendorID);

		const response = await axios.patch(`${BASE_URL}/update-vendor-banner`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data"
			}
		});

		return response.data;
	} catch (error: any) {
		return error.response.data;
	}
}


export const UpdateVendorInfo = async (vendorName: string, vendorDesc: string, vendorID: string) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.patch(`${BASE_URL}/update-vendor`, {
			vendorName,
			vendorDesc,
			vendorID
		}, {
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