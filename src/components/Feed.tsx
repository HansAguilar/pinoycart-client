import { Skeleton } from "@/components/ui/skeleton"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { authActions } from "@/store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { LucideStar } from "lucide-react";
import { fetchAllProducts } from "@/store/features/products/productSlice";

const Feed = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.products);
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
            {/* <Card className="max-w-max rounded-none flex flex-col gap-2">
                <img src="https://cdn.thinglink.me/api/image/655498865562091522/1024/10/scaletowidth/0/0/1/1/false/true?wait=true" className="w-48 h-48" />
                <Badge variant="secondary" className="max-w-max">Mall</Badge>
                <h3>Item</h3>
                <p className="text-lg text-destructive">₱ 150.00</p>
                <div className="flex items-center gap-2">
                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                    <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                </div>
            </Card> */}

            <div className="flex flex-wrap justify-between max-md:justify-around gap-4 border border-red-400 overflow-auto w-full m-auto">
                {
                    data?.products?.length > 0 ?
                        data?.products.map(item => (
                            <Card className="flex flex-col" key={item.itemName}>
                                {
                                    item.itemImages?.map((img: string) => (
                                        <div key={img}>
                                            <img
                                                src={`http://localhost:3000/uploads/${img}`}
                                                alt="Photo by Drew Beamer"
                                                className="rounded-md object-cover h-48 w-48"
                                            />
                                        </div>
                                    ))
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
                            <Card className="max-w-max rounded-none flex flex-col gap-2" key={index}>
                                <Skeleton className="w-48 h-48" />
                                <Skeleton className="w-[50px] h-[20px]" />
                                <Skeleton className="w-[180px] h-[20px]" />
                                <Skeleton className="w-[120px] h-[20px]" />
                            </Card>
                        ))
                }
            </div>

            {/* <Button variant="destructive" onClick={() => handleLogout()}>Logout</Button> */}
        </ >)
}

export default Feed