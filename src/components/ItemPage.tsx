import { getItemByID } from '@/store/features/items/itemSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { LucideStar, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { fetchVendorInfo } from '@/store/features/vendor/vendorSlice';
import { addToCart, cartActions } from '@/store/features/cart/cartSlice';
import { Card } from './ui/card';



const ItemPage = () => {
    const { id } = useParams();
    const item = useAppSelector((state: RootState) => state.items);
    const user = useAppSelector((state: RootState) => state.auth);
    const vendorInfo = useAppSelector((state: RootState) => state.vendor.data);
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState<number>(1);

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
                tempCart[foundItemIndex].itemStock +=  Number(quantity);
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
            dispatch(fetchVendorInfo(item.currentItem?.vendorID!));
        }

        if (user.isLogged) {
            getVendor();
        }
    }, [item.currentItem?.vendorID]);

    const handleQuantity = (operation: string) => {
        if (operation === "minus" && quantity > 1) {
            return setQuantity(prev => prev - 1)
        }
        else if (operation === "plus") {
            return setQuantity(prev => prev + 1)
        }
    }

    const handleAddToCart = (itemID: string) => {
        dispatch(addToCart([{
            itemID: itemID,
            itemStock: quantity
        }]))
        console.log([{
            itemID: itemID,
            itemStock: quantity
        }]);

        const newItem = { ...item.currentItem, itemStock: quantity };
        checkGuessCart(newItem)

        dispatch(cartActions.addToCart({ item: newItem, quantity: quantity }));
    }

    if (item.loading) {
        return <p>Loading</p>
    }

    return (
        <div className='flex flex-col max-w-4xl mx-auto mt-6'>
            <Card className='flex'>
                <div className='w-3/6'>
                    <img src={`http://localhost:3000/uploads/${item.currentItem?.itemImages[0]}`} className='h-96 w-full object-cover' />
                    <div className='grid grid-cols-3'>
                        {
                            item.currentItem?.itemImages.map((img, index) => {
                                return (
                                    index !== 0 && <img src={`http://localhost:3000/uploads/${img}`} key={img} className='h-full' />
                                )
                            })
                        }
                    </div>
                </div>

                <div className='w-3/6 flex flex-col pl-2'>
                    <h3 className='text-2xl tracking-tight'>{item.currentItem?.itemName}</h3>
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

                    <p className='leading-7'>{item.currentItem?.itemDesc}</p>
                    <h4>{vendorInfo?.vendorName}</h4>

                    <Separator />
                    <h2 className='text-xl font-semibold tracking-tight'>₱ {item.currentItem?.itemPrice}</h2>

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
                <p>Other products from {vendorInfo?.vendorName}</p>
                <div className='flex gap-4'>
                    {
                        item.items.map((allItem, index) => {
                            if (allItem._id !== item.currentItem?._id) {
                                return (
                                    <div key={index}>
                                        <img src={`http://localhost:3000/uploads/${allItem.itemImages[0]}`} className='w-52 h-52' />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemPage