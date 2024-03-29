import axios from "axios"

const BASE_URL = "http://localhost:3000/api/v1";

export const addToCartAPI = async (items: any, userID: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/add-cart`, {
            items,
            userID
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

export const editUserAPI = async (userID: string, username: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.patch(`${BASE_URL}/edit-user`, {
            userID,
            username
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

export const minusToCartAPI = async (items: any, userID: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/minus-cart`, {
            items,
            userID
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

export const getCartAPI = async (userID: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/get-cart`, { userID: userID }, {
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

export const removeCartAPI = async (cartID: string, userID: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/remove-cart`,
            { cartID: cartID, userID: userID }
            ,
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

export const changePasswordAPI = async (userID: string, password: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/change-password`,
            { userID: userID, password: password }
            ,
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