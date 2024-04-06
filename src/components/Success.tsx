// import { useAppSelector } from "@/store/hooks";
// import { RootState } from "@/store/store";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Skeleton } from "./ui/skeleton";

// const Success = () => {
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);

//     const user = useAppSelector((state: RootState) => state.auth);

//     useEffect(() => {
//         if (user.isLogged) {
//             const session_id = new URLSearchParams(window.location.search).get('session_id');
//             const fetchSuccess = async () => {
//                 try {
//                     const result = await axios.post(`http://localhost:3000/api/v1/success`,
//                         { session_id: session_id, userID: user.data?._id },
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//                             }
//                         })

//                     setMessage(result.data.message)
//                     setLoading(false)
//                     setError(false);
//                 }
//                 catch (error) {
//                     setLoading(false)
//                     setError(true);
//                     setMessage(error.response?.data?.message || "Error processing payment");
//                     console.error('Error processing payment:', error);
//                 }
//             }
//             if (session_id) {
//                 fetchSuccess()
//             } else {
//                 setLoading(false);
//                 setError(true);
//                 setMessage("Session ID is missing");
//             }
//         }
//     }, [])

//     if (loading) {
//         return (
//             <div className="py-8 flex items-center gap-4 flex-col justify-center h-screen w-full">
//                 <Skeleton className="container max-w-md items-center gap-4 flex flex-col justify-between p-4">
//                     <Skeleton className="h-20 w-56" />
//                     <Skeleton className="h-20 w-full" />
//                 </Skeleton>
//             </div>
//         )
//     }

//     return (
//         <div className="my-16 py-8 flex items-center flex-col justify-center h-screen w-full px-4">

//             <div className="flex flex-col items-center gap-4 bg-secondary w-full max-w-lg p-10 rounded-md">
//                 <div className={`bg-${error ? "red" : "green"}-300 p-4 rounded-full`}>
//                     <div className={`bg-${error ? "red" : "green"}-400 p-4 rounded-full`}>
//                         <div className={`bg-${error ? "red" : "green"}-500 p-2 rounded-full`}>
//                             {
//                                 error ?
//                                     <svg className="w-16 h-16 text-red-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                     :
//                                     <svg className="w-16 h-16 text-green-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                                     </svg>
//                             }
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex flex-col items-center" style={{ lineHeight: '1' }}>
//                     <p className={`text-${error ? "red" : "green"}-500 text-xl font-medium`}>{message}</p>
//                     <p className="text-slate-500 text-sm font-medium">Thank you for your order</p>
//                 </div>
//             </div>
//             <Link to="/" className="pt-14 text-primary">Return to homepage</Link>
//         </div>
//     );
// }

// export default Success;

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { cartActions } from "@/store/features/cart/cartSlice";

const Success = () => {
    const [a, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const user = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user.isLogged) {
            const session_id = a.get('session_id');
            const fetchSuccess = async () => {
                try {
                    const result = await axios.post(`http://localhost:3000/api/v1/success`,
                        { session_id: session_id, userID: user.data?._id },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            }
                        })

                    setMessage(result.data.message);
                    setLoading(false);
                    setError(false);

                    if(result.data.cache){
                        dispatch(cartActions.clearCart())

                    }
                }

                catch (error: any) {
                    setLoading(false);
                    setError(true);
                    setMessage(error.response.data.message);
                    console.log(error.response.data.message);
                }
            }
            fetchSuccess()
        }
    }, [])

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