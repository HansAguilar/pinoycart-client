import { Skeleton } from "@/components/ui/skeleton"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { LucideStar } from "lucide-react";
import { fetchAllProducts } from "@/store/features/items/itemSlice";

const Feed = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.items);
    const auth = useAppSelector(state => state.auth);

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authActions.isAuthenticated(false));
        navigate("/")
    }

    useEffect(() => {
        dispatch(fetchAllProducts());

    }, [])

    return (
        <>
            <div className="w-full grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 min-[400px]:grid-cols-2 gap-2">
                {
                    data?.items?.length > 0 ?
                        data?.items.map(item => (
                            <Card className="rounded-none flex flex-col lg:w-full gap-2" key={item.itemName}>
                                {
                                    <img
                                        src={`http://localhost:3000/uploads/${item.itemImages[0]}`}
                                        alt="Photo"
                                        className="object-cover h-48 w-full"
                                    />
                                }
                                <Badge variant="secondary" className="max-w-max">Mall</Badge>
                                <h3>{item.itemName}</h3>
                                <p className="text-lg text-destructive">₱ {item.itemPrice}</p>
                                <div className="flex items-center gap-2">
                                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                </div>
                            </Card>
                        ))
                        :
                        Array.from({ length: 13 }).map((_, index) => (
                            <Card className="rounded-none flex flex-col lg:w-full" key={index}>
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="w-full h-48" />
                                    <Skeleton className="w-1/4 h-4" />
                                    <Skeleton className="w-10/12 h-4" />
                                    <Skeleton className="w-2/3 h-4" />
                                </div>
                            </Card>
                        ))
                }
            </div>

            {/* <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260"/>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </ >)
}

export default Feed