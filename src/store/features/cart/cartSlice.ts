import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "./cartTypes";
import { addToCartAPI, getCartAPI, minusToCartAPI, removeCartAPI } from "@/api/userApi";

const intialState: ICart = {
    cartItems: [],
    total: 0,
    loading: false
}

const cartSlice = createSlice({
    initialState: intialState,
    name: "cart",
    reducers: {
        getLocalCart: (state) => {
            const getCartFromLocalStorage = localStorage.getItem('cart');
            const tempCart: any[] = getCartFromLocalStorage ? JSON.parse(getCartFromLocalStorage) : [];

            let tempTotal = 0;
            const updateDisplayItems = tempCart.map((item: any) => {
                let res = Number(item.itemPrice) * Number(item.itemStock);
                tempTotal += res;
                return item;
            });
            state.cartItems = updateDisplayItems
            state.total = tempTotal
        },
        removeItemLocalCart: (state, action) => {
            let priceItem = 0;
            const newCart = state.cartItems.filter(item => {
                priceItem = item.itemPrice * item.itemStock;
                return item._id !== action.payload;
            })
            state.cartItems = newCart;
            state.total -= priceItem;
        },
        addToCart: (state, action: PayloadAction<{ item: any, quantity: number }>) => {
            const cartIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload.item._id);

            if (cartIndex !== -1) {
                state.cartItems[cartIndex].itemStock += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload.item);
            }

            state.total += (action.payload.item.itemPrice * action.payload.quantity)
        },

        addPrice: (state, action: PayloadAction<{ itemPrice: number, quantity: number, _id: string }>) => {
            const cartIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
            state.cartItems[cartIndex].itemStock += 1;

            state.total += action.payload.itemPrice
        },
        minusPrice: (state, action: PayloadAction<{ itemPrice: number, quantity: number, _id: string }>) => {
            const cartIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
            state.cartItems[cartIndex].itemStock -= 1;
            state.total -= action.payload.itemPrice

            if (state.cartItems.length <= 1) {
                let priceItem = 0;
                const newCart = state.cartItems.filter(item => {
                    priceItem = item.itemPrice * item.itemStock;
                    return item._id !== action.payload._id;
                })
                state.cartItems = newCart;
                state.total -= priceItem;
            }
        },
        removeCart: (state, action) => {
            let priceItem = 0;
            const newCart = state.cartItems.filter(item => {
                priceItem = item.itemPrice * item.itemStock;
                return item._id !== action.payload;
            })
            state.cartItems = newCart;
            state.total -= priceItem;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                if (action.payload.data.length > 0) {
                    state.cartItems = action.payload.data;
                    state.total = state.cartItems.reduce((acc, item) => acc + (item.itemPrice * item.itemStock), 0);
                    state.loading = false
                }
            })
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload.data.length > 0) {
                    state.cartItems = action.payload.data;
                    state.total = state.cartItems.reduce((acc, item) => acc + (item.itemPrice * item.itemStock), 0);
                    state.loading = false
                }
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
    },

})


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;


export const addToCart = createAsyncThunk("cart/addToCart", async ({ items, userID }: { items: any, userID: string }) => {
    try {
        const response = await addToCartAPI(items, userID);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const minusToCart = createAsyncThunk("cart/minusToCart", async ({ items, userID }: { items: any, userID: string }) => {
    try {
        const response = await minusToCartAPI(items, userID);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const getCart = createAsyncThunk("cart/getCart", async (userID: string) => {
    try {
        const response = await getCartAPI(userID);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const removeCart = createAsyncThunk("cart/removeCart", async ({ cartID, userID }: { cartID: string, userID: string }) => {
    try {
        const response = await removeCartAPI(cartID, userID);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})