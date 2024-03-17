import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet'
import { Separator } from './ui/separator'
import { Cross2Icon } from '@radix-ui/react-icons'
import CartQuantity from './CartQuantity'
import { Button } from './ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { cartActions, getCart, removeCart } from '@/store/features/cart/cartSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import empty from "../assets/emptycart.png";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import { toast } from "sonner"

const CartSidebar = () => {
    const cart = useAppSelector((state: RootState) => state.cart)
    const user = useAppSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch();

    const [displayItems, setDisplayItems] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            if (user.isLogged) {
                dispatch(getCart(user.data?._id as string));

                let tempTotal = 0;
                const updateDisplayItems = cart.cartItems.map((item: any) => {
                    let res = Number(item.itemPrice) * Number(item.itemStock);
                    tempTotal += res;
                    return item;
                });

                setDisplayItems(updateDisplayItems)
                setTotal(tempTotal);
                return;
            }

            else {
                dispatch(cartActions.getLocalCart())
                const getCartFromLocalStorage = localStorage.getItem('cart');
                const tempCart: any[] = getCartFromLocalStorage ? JSON.parse(getCartFromLocalStorage) : [];

                let tempTotal = 0;
                const updateDisplayItems = tempCart.map((item: any) => {
                    let res = Number(item.itemPrice) * Number(item.itemStock);
                    tempTotal += res;
                    return item;
                });
                setTotal(tempTotal);
                setDisplayItems(updateDisplayItems);
                return;
            }
        };
        fetchCartData();
    }, [cart.total, user.isLogged]);

    const handleRemoveItemCart = (id: string) => {
        if (user.isLogged) {
            dispatch(cartActions.removeCart(id));
            dispatch(removeCart({ cartID: id, userID: user.data?._id! }));
        }
        else {
            const getCartFromLocalStorage = localStorage.getItem('cart');
            const tempCart: any[] = getCartFromLocalStorage ? JSON.parse(getCartFromLocalStorage) : [];
            const newCart = tempCart.filter(item => {
                return item._id !== id;
            })

            localStorage.setItem('cart', JSON.stringify(newCart));
            dispatch(cartActions.removeItemLocalCart(id));
        }
        toast.success("Item Removed!", { duration: 2000 })
    };

    const handleCheckout = async () => {
        if (!user.isLogged) {
            return navigate("/challenge")
        }
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY!);

        const session = await axios.post("http://localhost:3000/api/v1/create-checkout-session",
            { products: displayItems },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        const result = await stripe?.redirectToCheckout({
            sessionId: session.data.id
        })

        if (result?.error) {
            console.log(result.error)
        }
    }

    return (
        <SheetContent className='overflow-y-auto'>
            <Separator className="mb-4" />
            <SheetHeader>
                <div className="flex items-center justify-center gap-2">
                    <SheetTitle>My Cart</SheetTitle>
                    <span className="text-sm"> ({displayItems.length})</span>
                </div>
            </SheetHeader>
            <div className="flex flex-col gap-4 my-4">
                {
                    displayItems.length > 0 ?
                        displayItems.map((item: any) => (
                            <div key={item._id}>
                                <div className="rounded-sm flex items-center gap-4">
                                    <div className="relative">
                                        <img src={item.itemImages ? `http://localhost:3000/uploads/${item.itemImages[0]}` : ""} className='min-w-[90px] max-w-[30px] h-24 object-cover' />
                                        <div onClick={() => {

                                            handleRemoveItemCart(item._id)
                                        }}
                                            className="bg-secondary absolute -top-2 -left-2 rounded-full p-1 hover:bg-destructive transition-all duration-100 ease-linear cursor-pointer">
                                            <Cross2Icon className="h-4 w-4" />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <p>{item.itemName}</p>
                                        <div className='flex items-center gap-8 mt-auto'>
                                            <CartQuantity price={item.itemPrice} itemID={item._id} itemQty={item.itemStock} userID={user.data?._id as string} />
                                            <p className="text-primary font-medium text-lg">₱ {item.itemPrice}</p>
                                        </div>
                                    </div>
                                </div>
                                <Separator className="mt-4" />
                            </div>

                        ))
                        :
                        <div className='flex flex-col items-center'>
                            <img src={empty} className="w-full" />
                            <h4 className='text-white font-medium'>Your cart is empty</h4>
                            <p className='text-slate-500 text-sm'>Cart's a bit lonely. Time to fill it with goodies!</p>
                        </div>

                }
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-primary font-medium">TOTAL</h3>
                <p>₱ {cart.total ? cart.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>

            <Separator className="mt-4 mb-4" />

            <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit" disabled={displayItems.length <= 0} onClick={handleCheckout}>Checkout</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}

export default CartSidebar