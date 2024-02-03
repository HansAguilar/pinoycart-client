import { Minus, Plus } from 'lucide-react';
import { useState } from 'react'
import { Button } from './ui/button';
import { useAppDispatch } from '@/store/hooks';
import { cartActions } from '@/store/features/cart/cartSlice';

const CartQuantity = ({ price }: { price: number }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useAppDispatch();

    const handleQuantity = (operation: string) => {
        if (operation === "minus" && quantity > 1) {
            setQuantity(prev => prev - 1)
            dispatch(cartActions.minusPrice(price))
        }
        else if (operation === "plus") {
            setQuantity(prev => prev + 1)
            dispatch(cartActions.addPrice(price))
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

export default CartQuantity