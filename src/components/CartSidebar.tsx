import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet'
import { Separator } from './ui/separator'
import { Cross2Icon } from '@radix-ui/react-icons'
import CartQuantity from './CartQuantity'
import { Button } from './ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { cartActions, getCart, removeCart } from '@/store/features/cart/cartSlice'
import { useEffect } from 'react'


const CartSidebar = () => {
    const cart = useAppSelector((state: RootState) => state.cart)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCart());
        console.log(cart);
        
    }, [])

    const handleRemoveItemCart = (id: string) => {
        dispatch(cartActions.removeCart(id));
        dispatch(removeCart(id));
    };
    return (
        <SheetContent>
            <Separator className="mb-4" />
            <SheetHeader>
                <div className="flex items-center justify-center gap-2">
                    <SheetTitle>My Cart</SheetTitle>
                    <span className="text-sm"> ({cart.cartItems.length})</span>
                </div>
            </SheetHeader>
            <div className="flex flex-col gap-4 my-4">
                {
                    cart.cartItems.map((item: any) => (
                        <div key={item._id}>
                            <div className="rounded-sm flex items-center gap-4">
                                <div className="relative">
                                    <img src={`http://localhost:3000/uploads/${item.itemImages[0]}`} className='min-w-[90px] max-w-[30px]' />
                                    <div onClick={() => handleRemoveItemCart(item._id)} className="bg-secondary absolute -top-2 -left-2 rounded-full p-1 hover:bg-destructive transition-all duration-100 ease-linear cursor-pointer">
                                        <Cross2Icon className="h-4 w-4" />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <p>{item.itemName}</p>
                                    <div className='flex items-center gap-8 mt-auto'>
                                        <CartQuantity price={item.itemPrice} itemID={item._id} itemQty={item.itemQuantity} />
                                        <p className="text-primary font-medium text-lg">₱ {item.itemPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <Separator className="mt-4" />
                        </div>

                    ))
                }
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-primary font-medium">TOTAL</h3>
                <p>₱ {cart.total}</p>
            </div>

            <Separator className="mt-4 mb-4" />

            <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}

export default CartSidebar