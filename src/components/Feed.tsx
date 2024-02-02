import { Skeleton } from "@/components/ui/skeleton"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { LucideStar } from "lucide-react";
import { fetchAllProducts } from "@/store/features/items/itemSlice";

const Feed = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.items);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [])

    return (
        <>
            <div className="w-full grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 min-[400px]:grid-cols-2 gap-2">
                {
                    data?.items?.length > 0 ?
                        data?.items.map(item => (
                            <NavLink to={`${item._id}`} key={item._id}>
                                <Card className="rounded-none flex flex-col lg:w-full gap-2" key={item.itemName}>
                                    {
                                        <img
                                            src={`http://localhost:3000/uploads/${item.itemImages[0]}`}
                                            alt="Photo"
                                            className="object-cover h-48 w-full"
                                        />
                                    }
                                    <Badge variant="secondary" className="max-w-max">Mall</Badge>
                                    <div>
                                        <h3>{item.itemName}</h3>
                                        <p className="text-xs">{item.vendorID.vendorName}</p>
                                    </div>
                                    <p className="text-lg text-destructive">₱ {item.itemPrice}</p>
                                    <div className="flex items-center gap-2">
                                        <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                        <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                        <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                        <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                        <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                    </div>
                                </Card>
                            </NavLink>

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
        </ >)
}

export default Feed