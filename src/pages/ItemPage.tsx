import { getItemByID } from '@/store/features/items/itemSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { AlignLeft, ArrowLeft, LucideStar, Minus, MoveLeft, Plus } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
import { fetchVendorInfo } from '@/store/features/vendor/vendorSlice';
import { addToCart, cartActions } from '@/store/features/cart/cartSlice';
import { Card } from '../components/ui/card';
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from '../components/ui/badge';


const ItemPage = () => {
    const { id } = useParams();
    const item = useAppSelector((state: RootState) => state.items);
    const user = useAppSelector((state: RootState) => state.auth);
    const vendorInfo = useAppSelector((state: RootState) => state.vendor.data);
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState<number>(1);
    const [shuffledItems, setShuffledItems] = useState<any[]>([]);

    useEffect(() => {
        const shuffled = item.items ? [...item.items].sort(() => Math.random() - 0.5) : [];
        setShuffledItems(shuffled);
    }, [item]);


    const displayOtherProducts = () => {
        if (item.loading) {
            return <Skeleton className="w-full h-48" />;
        }

        return shuffledItems.slice(0, 5).map((allItem, index) => {
            if (allItem._id !== item.currentItem?._id) {
                return (
                    <Link key={index} to={`/item/${allItem._id}`}>
                        <Card className="rounded-none flex flex-col lg:w-full gap-2" key={allItem.itemName}>
                            {
                                <img
                                    src={`http://localhost:3000/uploads/${allItem.itemImages[0]}`}
                                    alt="Photo"
                                    className="object-cover max-sm:h-40 h-48 w-full"
                                />
                            }
                            <Badge variant="secondary" className="max-w-max">Mall</Badge>
                            <div>
                                <h3 className="font-medium text-sm truncate">{allItem.itemName}</h3>
                                <p className="text-xs">{allItem.vendorID.vendorName}</p>
                            </div>
                            <p className="text-lg text-destructive">₱ {allItem.itemPrice}</p>
                            <div className="flex items-center pb-2">
                                <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                                <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            </div>
                        </Card>
                    </Link>
                )
            }
        })
    }


    //! DITO NAGTAPOS SA CART GUESS
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
        console.log(vendorInfo)
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
        else if (operation === "plus") {
            return setQuantity(prev => prev + 1)
        }
    }

    const handleAddToCart = (itemID: string) => {
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

    function applyRandomDiscount(originalPrice: number) {
        return originalPrice - 1;
    }

    if (item.loading) {
        return (
            <div className='flex flex-col max-w-4xl mx-auto mt-6'>
                <Card className='flex'>
                    <Skeleton className='w-3/6' />
                </Card>
            </div>
        )
    }

    return (
        <div className='flex flex-col container my-8 max-w-4xl gap-4'>
            <NavLink to="/" className='flex items-center max-w-max gap-2'>
                <ArrowLeft className='h-4 w-4' />
                <p className='font-medium'>Go back</p>
            </NavLink>
            
            <Card className='flex rounded max-md:flex-col'>
                <div className='w-3/6 max-md:w-full flex items-center justify-center' style={{ backgroundColor: ambianceColor }}>
                    <Carousel>
                        <CarouselContent>
                            {
                                item.currentItem?.itemImages.map((img) => {
                                    return (
                                        <CarouselItem key={img}>
                                            <img src={`http://localhost:3000/uploads/${img}`} ref={imgRef} onLoad={readImageData} className='h-full m-auto object-contain max-h-96' />
                                        </CarouselItem>
                                    )
                                })
                            }
                        </CarouselContent>
                        <CarouselPrevious className='left-0 bg-secondary' />
                        <CarouselNext className='right-0 bg-secondary' />
                    </Carousel>
                </div>

                <div className='w-3/6 max-md:w-full flex flex-col p-4'>
                    <h3 className='text-2xl tracking-tight truncate'>{item.currentItem?.itemName}</h3>
                    <div className='flex'>
                        <div className="flex items-center gap-2">
                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={16} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                        </div>
                        <p>{item.currentItem?.itemRatings}</p>
                    </div>

                    <p className='text-slate-400'>{item.currentItem?.itemStock} stock</p>
                    <p className='leading-7 truncate'>{item.currentItem?.itemDesc}</p>

                    <div className='flex items-center gap-2'>
                        <img src={`http://localhost:3000/uploads/${vendorInfo?.vendorBanner}`} className='rounded border w-10 h-10' alt=":)" />
                        <h4>{vendorInfo?.vendorName}</h4>
                    </div>

                    <Separator className='my-4' />

                    <div className=''>
                        <h2 className='text-lg line-through text-gray-500'>₱ {(Number(item.currentItem?.itemPrice))}</h2>
                        <h2 className='text-xl font-semibold tracking-tight text-destructive'>₱ {applyRandomDiscount(Number(item.currentItem?.itemPrice)).toFixed(2)}</h2>
                    </div>

                    <div className='flex items-center gap-8 mt-auto'>
                        <Button className='uppercase' onClick={() => handleAddToCart(item.currentItem?._id!)}>Add to cart</Button>
                        <div className='flex border border-secondary max-w-max items-center gap-2'>
                            <Button variant="outline" size="icon" onClick={() => handleQuantity("minus")} disabled={quantity === 1}><Minus /></Button>
                            <p className='font-medium px-4'>{quantity}</p>
                            <Button variant="outline" size="icon" onClick={() => handleQuantity("plus")}><Plus /></Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div>
                <p className='text-sm'>Other products from {vendorInfo?.vendorName}</p>
                <div className='grid max-md:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-2 grid-cols-4 gap-4'>
                    {
                        vendorInfo ?
                            displayOtherProducts()
                            :
                            <Skeleton className="w-full h-48" />
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemPage