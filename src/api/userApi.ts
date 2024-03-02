import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

export const addToCartAPI = async (items: any) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/add-cart`, {
            items: items
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    }

    catch (error: any) {
        return error.response.data;
    }
}

export const getCartAPI = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${BASE_URL}/get-cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    }

    catch (error: any) {
        return error.response.data;
    }
}

export const removeCartAPI = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/remove-cart`, {
            cartID: id
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response;
    }

    catch (error: any) {
        return error.response.data;
    }
}