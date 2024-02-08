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
    const vendorInfo = useAppSelector((state: RootState) => state.vendor.data);
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        dispatch(getItemByID(id));

        const getVendor = async () => {
            dispatch(fetchVendorInfo(item.currentItem?.vendorID!));
        }
        getVendor();
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
            itemQuantity: quantity
        }]))
        console.log([{
            itemID: itemID,
            itemQuantity: quantity
        }]);
        const newItem = { ...item.currentItem, itemQuantity: quantity }

        dispatch(cartActions.addToCart({ item: newItem, quantity: quantity }));
    }

    if (item.loading) {
        return <p>Loading</p>
    }

    return (
        <div className='flex flex-col max-w-4xl mx-auto mt-6'>
            <Card className='flex'>
                <div className='w-3/6'>
                    <img src={`http://localhost:3000/uploads/${item.currentItem?.itemImages[0]}`} className='h-96' />
                    {/* {
                    item?.itemImages.map((img, index) => {
                        return (
                            index !== 0 && <img src={`http://localhost:3000/uploads/${img}`} />
                        )
                    })
                } */}
                </div>

                <div className='w-3/6 flex flex-col'>
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

                    <p>{item.currentItem?.itemQuantity}</p>

                    <p className='leading-7'>{item.currentItem?.itemDesc}</p>

                    <Separator />
                    <h2 className='text-xl font-semibold tracking-tight'>{item.currentItem?.itemPrice}</h2>

                    <div className='flex items-center gap-8 mt-auto'>
                        <Button className='uppercase' onClick={() => handleAddToCart(item.currentItem?._id!)}>Add to cart</Button>
                        <div className='flex border border-secondary max-w-max items-center gap-2'>
                            <Button variant="outline" size="icon" onClick={() => handleQuantity("minus")}><Minus /></Button>
                            <p className='font-medium px-4'>{quantity}</p>
                            <Button variant="outline" size="icon" onClick={() => handleQuantity("plus")}><Plus /></Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div>
                <h4>{vendorInfo?.vendorName}</h4>
            </div>

        </div>
    )
}

export default ItemPage