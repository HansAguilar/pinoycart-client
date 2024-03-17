import { Minus, Plus } from 'lucide-react';
import { memo, useState } from 'react'
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, cartActions, minusToCart, removeCart } from '@/store/features/cart/cartSlice';
import { RootState } from '@/store/store';

const updateLocalCartStock = (operation: string, quantity: number, itemID: string) => {
    const getCartFromLocalStorage = localStorage.getItem('cart');
    const tempCart: any[] = getCartFromLocalStorage ? JSON.parse(getCartFromLocalStorage) : [];
    const foundItemIndex = tempCart.findIndex((itemCart) => itemCart._id === itemID);

    if (operation === "minus" && quantity > 1) {
        tempCart[foundItemIndex].itemStock -= 1
    }

    else if (operation === "plus") {
        tempCart[foundItemIndex].itemStock += 1
    }
    localStorage.setItem('cart', JSON.stringify(tempCart));
}

const CartQuantity = ({ price, itemID, itemQty, userID }: { price: number, itemID: string, itemQty: number, userID: string }) => {
    const [quantity, setQuantity] = useState<number>(itemQty);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth)

    const handleQuantity = (operation: string) => {
        if (user.isLogged) {
            if (operation === "minus") {
                setQuantity(prev => prev - 1)
                dispatch(cartActions.minusPrice({ itemPrice: price, quantity: quantity, _id: itemID }))
                const items = {
                    items: [{ itemQuantity: 1, itemID: itemID }],
                    userID: userID
                }
                dispatch(minusToCart(items))
            }
            else if (operation === "plus") {
                setQuantity(prev => prev + 1)
                dispatch(cartActions.addPrice({ itemPrice: price, quantity: quantity, _id: itemID }))
                const items = {
                    items: [{ itemQuantity: 1, itemID: itemID }],
                    userID: userID
                }
                dispatch(addToCart(items))
            }
        }
        else {
            updateLocalCartStock(operation, quantity, itemID)
            if (operation === "minus") {
                setQuantity(prev => prev - 1)
            }
            else if (operation === "plus") {
                setQuantity(prev => prev + 1)
            }
            dispatch(cartActions.getLocalCart())
        }
    }

    return (
        <div className='flex border border-secondary max-w-max items-center gap-2'>
            <Button variant="outline" size="icon" onClick={() => handleQuantity("minus")}><Minus className="h-4 w-4" /></Button>
            <p className='font-medium px-2 text-sm'>{quantity}</p>
            <Button variant="outline" size="icon" onClick={() => handleQuantity("plus")}><Plus className="h-4 w-4" /></Button>
        </div>
    )
}

export default memo(CartQuantity)