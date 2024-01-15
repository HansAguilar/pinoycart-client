import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Layout from "./Layout";
import { verifyToken } from "@/store/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoutes = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(verifyToken());
    }, [])

    const RenderComponent = () => {
        return auth.loading ? <p>Loading</p> : auth.isLogged ? <Layout /> : <Navigate to="/" />
    }

    return (
        <RenderComponent />
    )
}

export default PrivateRoutes