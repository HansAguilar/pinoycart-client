import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Layout from "./Layout";
import axios from "axios";
import { authActions } from "@/store/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoutes = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token) {
                    const response = await axios.post("http://localhost:3000/api/v1/user/verifyToken", token, {
                        withCredentials: true
                    });
                    dispatch(authActions.isAuthenticated(true))
                    console.log(response);
                }

                else {
                    dispatch(authActions.isAuthenticated(false))
                }
            }
            catch (error: any) {
                console.log(error);
            }
        }
        verifyToken()
    }, [])

    const RenderComponent = () => {
        return auth.loading ? <p>Loading</p> : auth.isLogged ? <Layout /> : <Navigate to="/" />
    }

    return (
        <RenderComponent />
    )
}

export default PrivateRoutes