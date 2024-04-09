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
            <div className="w-full grid max-md:grid-cols-3 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 min-[400px]:grid-cols-2 max-sm:grid-cols-2 gap-2 max-sm:gap-4">
                {
                    data?.items?.length > 0 ?
                        data?.items.filter(item => item.itemStock > 0).map(item => (
                            <NavLink to={`item/${item._id}`} key={item._id} className="hover:shadow">
                                <Card className="rounded-none flex flex-col lg:w-full gap-2" key={item.itemName}>
                                    {
                                        <img
                                            src={`http://localhost:3000/uploads/${item.itemImages[0]}`}
                                            alt="Photo"
                                            className="object-cover max-sm:h-40 h-48 w-full"
                                        />
                                    }

                                    <div className="flex flex-col gap-2 p-2">
                                        <Badge variant="secondary" className="max-w-max">Mall</Badge>
                                        <div>
                                            <h3 className="font-medium text-sm truncate">{item.itemName}</h3>
                                            <p className="text-xs">{item.vendorID?.vendorName}</p>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <h2 className='line-through text-muted-foreground font-medium'>₱{(Number(item.itemPrice) + 10).toFixed(2)}</h2>
                                            <h2 className='text-primary font-medium'>₱{item.itemPrice.toLocaleString()}</h2>
                                        </div>

                                        <div className="flex items-center pb-2">
                                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                        </div>
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