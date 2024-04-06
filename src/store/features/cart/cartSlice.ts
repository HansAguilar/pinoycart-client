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
        removeItemLocalCart: (state, action: PayloadAction<string>) => {
            const removedItem = state.cartItems.find(item => item._id === action.payload);
            if (removedItem) {
                const priceItem = removedItem.itemPrice * removedItem.itemStock;
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
                state.total -= priceItem;
            }
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
            state.total -= action.payload.itemPrice;

            // If the item's stock reaches 0, remove it from the cart
            if (state.cartItems[cartIndex].itemStock === 0) {
                state.cartItems.splice(cartIndex, 1);
            }
        },
        removeCart: (state, action) => {
            const removedItem = state.cartItems.find(item => item._id === action.payload);
            if (removedItem) {
                const priceItem = removedItem.itemPrice * removedItem.itemStock;
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
                state.total -= priceItem;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.total = 0;
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
                state.cartItems = action.payload.data;
                state.total = state.cartItems.reduce((acc, item) => acc + (item.itemPrice * item.itemStock), 0);
                state.loading = false
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