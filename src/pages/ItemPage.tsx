import { getItemByID } from '@/store/features/items/itemSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { ArrowLeft, ChevronDown, ChevronUp, LucideChevronDown, LucideStar, LucideThumbsUp, Star, ThumbsUp, ThumbsUpIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import { fetchVendorInfo } from '@/store/features/vendor/vendorSlice';
import { addToCart, cartActions } from '@/store/features/cart/cartSlice';
import { Card } from '../components/ui/card';
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from '../components/ui/badge';
import CardItem from '@/components/itemPage/CardItem';
import Reviews from '@/components/itemPage/Reviews';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    const filledStars = Array.from({ length: rating }).map((_, index) => (
        <Star key={index} className='text-yellow-400' size={16} fill='yellow' />
    ));
    const emptyStars = Array.from({ length: totalStars - rating }).map((_, index) => (
        <Star key={rating + index} className='text-gray-500' size={16} />
    ));

    return (
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            {filledStars}
            {emptyStars}
        </div>
    );
};

const ItemPage = () => {
    const { id } = useParams();
    const item = useAppSelector((state: RootState) => state.items);
    const user = useAppSelector((state: RootState) => state.auth);
    const vendorInfo = useAppSelector((state: RootState) => state.vendor);
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState<number>(1);
    const [shuffledItems, setShuffledItems] = useState<any[]>([]);

    const [reviewLikes, setReviewLikes] = useState<number>(0);

    useEffect(() => {
        //^ RANDOM ITEM RECOOMENDATION
        const shuffled = item.items ? [...item.items].sort(() => Math.random() - 0.5) : [];
        setShuffledItems(shuffled);
    }, [item]);

    useEffect(() => {
        if (item.currentItem) {
            document.title = `${item.currentItem.itemName}`;
        }

        return () => {
            document.title = 'PinoyCart';
        }
    }, [item.currentItem]);

    const displayOtherProducts = () => {
        if (item.loading) {
            return (
                <>
                    <Skeleton className="w-full h-48" />
                    <Skeleton className="w-full h-48" />
                    <Skeleton className="w-full h-48" />
                    <Skeleton className="w-full h-48" />
                </>
            )
        }

        return shuffledItems.slice(0, 5).map((allItem, index) => {
            if (allItem._id !== item.currentItem?._id) {
                return (
                    <Link key={index} to={`/item/${allItem._id}`}>
                        <Card className="rounded-none flex flex-col lg:w-full gap-2" key={allItem.itemName}>
                            <img
                                src={`http://localhost:3000/uploads/${allItem.itemImages[0]}`}
                                alt="Photo"
                                className="object-cover max-sm:h-40 h-48 w-full"
                            />

                            <div className="flex flex-col gap-2 p-2">
                                <Badge variant="secondary" className="max-w-max">Mall</Badge>

                                <div>
                                    <h3 className="font-medium text-sm truncate">{allItem.itemName}</h3>
                                    <p className="text-xs">{allItem.vendorID.vendorName}</p>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <h2 className='line-through text-muted-foreground font-medium'>₱{(allItem.itemPrice + 10).toLocaleString()}</h2>
                                    <h2 className='text-primary font-medium'>₱{allItem.itemPrice.toLocaleString()}</h2>
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
                    </Link>
                )
            }
        })
    }


    //^ ADD ITEMS TO LOCAL STORAGE 
    const checkGuessCart = (item: any) => {
        const getCartFromLocalStorage = localStorage.getItem('cart');
        const tempCart: any[] = getCartFromLocalStorage ? JSON.parse(getCartFromLocalStorage) : [];

        if (tempCart.length < 1) {
            // If the cart is empty, add the item directly
            tempCart.push(item);
        } else {
            // If the cart is not empty, find and update the existing item
            const foundItemIndex = tempCart.findIndex((itemCart) => itemCart._id == id);

            if (foundItemIndex !== -1) {
                // If the item is found, update the quantity
                tempCart[foundItemIndex].itemStock += Number(quantity);
            } else {
                // If the item is not found, add it to the cart
                tempCart.push(item);
            }
        }

        localStorage.setItem('cart', JSON.stringify(tempCart));
    };

    useEffect(() => {
        dispatch(getItemByID(id));

        const getVendor = async () => {
            await dispatch(fetchVendorInfo(item.currentItem?.vendorID!));
        }

        if (item.currentItem?.vendorID) {
            getVendor();
        }
        setQuantity(1);

        return () => {
            // Reset ambiance color when component unmounts
            setAmbianceColor('#ffffff');
        };
    }, [item.currentItem?.vendorID, id]);


    const handleQuantity = (operation: string) => {
        if (operation === "minus" && quantity > 1) {
            return setQuantity(prev => prev - 1)
        }
        else if (operation === "plus" && (quantity < item.currentItem?.itemStock!)) {
            return setQuantity(prev => prev + 1)
        }
    }

    const handleAddToCart = (itemID: string, itemStock: number) => {
        if (itemStock > 0) {
            const items = {
                items: [{ itemQuantity: quantity, itemID: itemID }],
                userID: user.data?._id!
            }
            dispatch(addToCart(items))
            const newItem = { ...item.currentItem, itemStock: quantity };
            checkGuessCart(newItem)

            dispatch(cartActions.addToCart({ item: newItem, quantity: quantity }));
            toast.success("Item added to cart!", { duration: 2000 })
        }
    }

    const [ambianceColor, setAmbianceColor] = useState<string>('#ffffff'); // State to hold the ambiance color
    const imgRef = useRef<HTMLImageElement>(null);

    const readImageData = useCallback(() => {
        const img = imgRef.current;
        img!.crossOrigin = "Anonymous";
        if (!img?.width) {
            return;
        }
        const { width, height } = img;
        const canvas = document.createElement("canvas");
        canvas.height = height;
        canvas.width = width;
        const context = canvas.getContext?.("2d");
        if (context === null) {
            return;
        }
        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, width, height);

        // Calculate the average color of the image
        let totalR = 0, totalG = 0, totalB = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            totalR += imageData.data[i];
            totalG += imageData.data[i + 1];
            totalB += imageData.data[i + 2];
        }
        const avgR = totalR / (imageData.data.length / 4);
        const avgG = totalG / (imageData.data.length / 4);
        const avgB = totalB / (imageData.data.length / 4);

        // Set the background color using the average color of the image
        const bgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
        setAmbianceColor(bgColor); // Update the state with the ambiance color
    }, []);

    return (
        <div className='flex flex-col container mb-8 max-w-4xl gap-4 mt-[calc(2rem+4rem)]'>
            <NavLink to="/" className='flex items-center max-w-max gap-2'>
                <ArrowLeft className='h-4 w-4' />
                <p className='font-medium'>Go back</p>
            </NavLink>

            {
                item.loading || vendorInfo.loading ?
                    <Skeleton className='flex flex-col w-full mx-auto mt-6 h-96'>
                        <Skeleton />
                    </Skeleton>
                    :
                    <CardItem
                        item={item}
                        quantity={quantity}
                        handleAddToCart={handleAddToCart}
                        vendorInfo={vendorInfo}
                        handleQuantity={handleQuantity}
                        imgRef={imgRef}
                        readImageData={readImageData}
                        ambianceColor={ambianceColor}
                    />
            }

            <article>
                <p className="font-medium py-4">Product Reviews</p>

                {
                    item.currentItem?.itemReviews.map(review => (
                        <>
                            <div className="flex items-start font-medium justify-between">
                                <div className="flex items-center mb-4 font-medium">
                                    <Avatar className='w-10 h-10 me-4 rounded-full'>
                                        <AvatarImage src={`https://ui-avatars.com/api/?name=${review.username.substring(0, 2)}&background=6225c5&color=fff`} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p>{review.username} <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></p>
                                </div>
                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                    <StarRating rating={review.rating} />
                                </div>
                            </div>


                            <p className="mb-2 text-gray-500">{review.comment}</p>

                            <aside>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <Button variant="ghost" className='group' size="icon" onClick={() => setReviewLikes(review.likes + 1)}>
                                            <ThumbsUp size={18} className={`text-gray-500 max-w-max group-hover:text-primary ${review.isLiked && "text-primary"} cursor-pointer`} />
                                        </Button>
                                        <p className="mt-1 font-medium text-xs text-gray-500"> {reviewLikes > 0 ? reviewLikes : review.likes} people found this helpful</p>
                                    </div>

                                    <a href="#" className="ps-4 text-xs font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-600 ms-4 border-s md:mb-0">Report abuse</a>
                                </div>
                            </aside>
                        </>

                    ))
                }


            </article>


            <div>
                <p className='text-sm mt-4 mb-2'>Other products from {vendorInfo.data?.vendorName}</p>
                <div className='grid max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-2 grid-cols-4 gap-4'>
                    {
                        vendorInfo && displayOtherProducts()
                    }
                </div>
            </div>

            {
                user.data?.orders.includes(id!) && <Reviews />
            }
        </div>
    )

}

export default ItemPage