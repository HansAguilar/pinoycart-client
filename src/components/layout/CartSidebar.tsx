import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from '../ui/sheet'
import { Separator } from '../ui/separator'
import { Cross2Icon } from '@radix-ui/react-icons'
import CartQuantity from '../itemPage/CartQuantity'
import { Button } from '../ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { cartActions, getCart, removeCart } from '@/store/features/cart/cartSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import empty from "../../assets/emptycart.png";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import { toast } from "sonner"
import { IItems } from '@/store/features/items/itemTypes'

const CartSidebar = () => {
    const cart = useAppSelector((state: RootState) => state.cart)
    const user = useAppSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [displayItems, setDisplayItems] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);

    //^ 1ST USEFFECT FOR FETCHING LANG 
    useEffect(() => {
        const fetchCartData = async () => {
            if (user.isLogged) {
                dispatch(getCart(user.data?._id as string));
            } else {
                dispatch(cartActions.getLocalCart());
            }
        };

        fetchCartData();
    }, [dispatch, user.isLogged, user.data?._id]);

    //^ 2ND USEEFFECT FOR DISPLAYING ITEMS
    useEffect(() => {
        let tempTotal = 0;
        const updateDisplayItems = cart.cartItems.map((item: any) => {
            let res = Number(item.itemPrice) * Number(item.itemStock);
            tempTotal += res;
            return item;
        });

        setDisplayItems(updateDisplayItems);
        setTotal(tempTotal);
    }, [cart.cartItems]);

    const handleRemoveItemCart = (id: string) => {
        if (user.isLogged) {
            dispatch(cartActions.removeCart(id));
            dispatch(removeCart({ cartID: id, userID: user.data?._id! }));
        } else {
            const tempCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const newCart = tempCart.filter((item: any) => item._id !== id);
            localStorage.setItem('cart', JSON.stringify(newCart));
            dispatch(cartActions.removeItemLocalCart(id));
        }
        toast.success("Item Removed!", { duration: 2000 })
    };

    const handleCheckout = async () => {
        if (!user.isLogged) {
            return navigate("/challenge");
        }

        if (displayItems.length === 0) {
            toast.error("Your cart is empty. Add items to proceed to checkout.");
            return;
        }

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY!);
        setSubmitted(true);

        try {
            const session = await axios.post(
                import.meta.env.VITE_CHECKOUT_SESSION_API,
                { products: displayItems, userID: user.data?._id },
                { headers: { "Content-Type": "application/json" } }
            );

            setTimeout(async () => {
                const result = await stripe?.redirectToCheckout({
                    sessionId: session.data.session_id
                });

                if (result?.error) {
                    console.log(result.error)
                }

                setSubmitted(false);
            }, 2000); // 2-second delay
        } catch (error) {
            console.error("Error during checkout:", error);
            setSubmitted(false);
            toast.error("Error during checkout. Please try again later.");
        }
    };

    const renderCartItem = (item: IItems) => (
        <div key={item._id}>
            <div className="rounded-sm flex items-center gap-4">
                <div className="relative">
                    <img
                        src={item.itemImages ? `${item.itemImages[0]}` : ""}
                        className='w-auto h-24 object-cover max-w-[90px] min-w-[30px]'
                    />
                    <div
                        onClick={() => handleRemoveItemCart(item._id)}
                        className="bg-secondary absolute -top-2 -left-2 rounded-full p-1 hover:bg-destructive transition-all duration-100 ease-linear cursor-pointer"
                    >
                        <Cross2Icon className="h-4 w-4" />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>{item.itemName}</p>
                    <div className='flex items-center gap-8 mt-auto'>
                        <CartQuantity price={item.itemPrice} itemID={item._id} itemQty={item.itemStock} userID={user.data?._id as string} />
                        <p className="text-primary font-medium text-lg">₱{item.itemPrice.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <Separator className="mt-4" />
        </div>
    );

    return (
        <SheetContent className='overflow-y-auto'>
            <Separator className="mt-8 mb-4" />
            <SheetHeader>
                <div className="flex items-center justify-center gap-2">
                    <SheetTitle>My Cart</SheetTitle>
                    <span className="text-sm"> ({displayItems.length})</span>
                </div>
            </SheetHeader>
            <div className="flex flex-col gap-4 my-4">
                {
                    displayItems.length > 0 ?
                        displayItems.map(renderCartItem)
                        :
                        <div className='flex flex-col items-center'>
                            <img src={empty} className="w-full" />
                            <h4 className='font-medium'>Your cart is empty</h4>
                            <p className='text-muted-foreground text-sm'>Cart's a bit lonely. Time to fill it with goodies!</p>
                        </div>
                }
            </div>

            <div className="flex items-center justify-between">
                <h3>TOTAL</h3>
                <p className='text-lg text-primary'>₱{cart.total ? cart.total.toFixed(2).toLocaleString() : total.toLocaleString()}</p>
            </div>

            <Separator className="mt-4 mb-4" />

            <SheetFooter>
                <Button disabled={submitted || displayItems.length < 1} onClick={handleCheckout}>
                    <div role="status">
                        <span>
                            {
                                submitted ?
                                    <div className='flex items-center gap-2'>
                                        <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <p>Processing...</p>
                                    </div>
                                    :
                                    <p>Checkout</p>
                            }
                        </span>
                        <span className="sr-only">Loading...</span>
                    </div>
                </Button>
            </SheetFooter>
        </SheetContent>
    )
}

export default CartSidebar