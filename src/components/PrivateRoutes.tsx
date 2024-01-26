import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyToken } from "@/store/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "@/store/store";

const PrivateRoutes = () => {
    const auth = useAppSelector((state: RootState) => state.auth);
    const vendor = useAppSelector((state: RootState) => state.vendor.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(verifyToken());
    }, [])

    if (auth.loading) {
        return <p>Loading</p>;
    }

    return auth.isLogged ? <Outlet /> : <Navigate to="/" />;

}

export default PrivateRoutes