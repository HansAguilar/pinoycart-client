import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { cartActions } from "@/store/features/cart/cartSlice";

const Success = () => {
    const [a, ] = useSearchParams();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const user = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let isMounted = true; // Flag to track component mount status
    
        const fetchSuccess = async (session_id: string) => {
            try {
                const result = await axios.post(
                    `https://pinoycart-server.vercel.app/api/v1/success`,
                    { session_id: session_id, userID: user.data?._id },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
                );
    
                // Check if component is still mounted before updating state
                if (isMounted) {
                    setMessage(result.data.message);
                    setLoading(false);
                    setError(false);
    
                    if (result.data.cache) {
                        dispatch(cartActions.clearCart());
                    }
                }
            } catch (error: any) {
                // Check if component is still mounted before updating state
                if (isMounted) {
                    setLoading(false);
                    setError(true);
                    setMessage(error.response.data.message);
                    console.log(error.response.data.message);
                }
            }
        };
    
        if (user.isLogged && a.has('session_id')) {
            const session_id = a.get('session_id');
            fetchSuccess(session_id!);
        }
    
        // Cleanup function to set isMounted to false when component unmounts
        return () => {
            isMounted = false;
        };
    }, []);
    


    if (loading) {
        return (
            <div className="py-8 flex items-center gap-4 flex-col justify-center h-screen w-full">
                <Skeleton className="container max-w-md items-center gap-4 flex flex-col justify-between p-4">
                    <Skeleton className="h-20 w-56" />
                    <Skeleton className="h-20 w-full" />
                </Skeleton>
            </div>
        )
    }

    return (
        <div className="my-16 py-8 flex items-center flex-col justify-center h-screen w-full px-4">
            <div className="flex flex-col items-center gap-4 bg-secondary w-full max-w-lg p-10 rounded-md">
                <div className={`${error ? "bg-red-300" : "bg-green-300"} p-4 rounded-full`}>
                    <div className={`${error ? "bg-red-400" : "bg-green-400"} p-4 rounded-full`}>
                        <div className={`${error ? "bg-red-500" : "bg-green-500"} p-2 rounded-full`}>
                            {
                                error ?
                                    <svg className="w-16 h-16 text-red-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    :
                                    <svg className="w-16 h-16 text-green-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center" style={{ lineHeight: '1' }}>
                    <p className={`${error ? "text-red-500" : "text-green-500"} text-xl font-medium`}>{message}</p>
                    {!error && <p className="text-slate-500 text-sm font-medium">Thank you for your order</p>}
                </div>
            </div>
            <Link to="/" className="pt-14 text-primary">Return to homepage</Link>
        </div>
    );
}

export default Success;