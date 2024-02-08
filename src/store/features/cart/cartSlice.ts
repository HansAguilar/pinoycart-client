import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "./cartTypes";
import { addToCartAPI, getCartAPI, removeCartAPI } from "@/api/userApi";

const intialState: ICart = {
    cartItems: [],
    total: 0
}

const cartSlice = createSlice({
    initialState: intialState,
    name: "cart",
    reducers: {
        addToCart: (state, action: PayloadAction<{ item: any, quantity: number }>) => {
            const cartIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload.item._id);

            if (cartIndex !== -1) {
                state.cartItems[cartIndex].itemQuantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload.item);
            }

            state.total += (action.payload.item.itemPrice * action.payload.quantity)
        },

        addPrice: (state, action: PayloadAction<{ itemPrice: number, quantity: number, _id: string }>) => {
            const cartIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
            state.cartItems[cartIndex].itemQuantity += 1;

            state.total += action.payload.itemPrice
        },
        minusPrice: (state, action: PayloadAction<{ itemPrice: number, quantity: number, _id: string }>) => {
            const cartIndex = state.cartItems.findIndex((cartItem) => cartItem._id === action.payload._id);
            state.cartItems[cartIndex].itemQuantity -= 1;

            state.total -= action.payload.itemPrice 
        },
        removeCart: (state, action) => {
            let priceItem = 0;
            const newCart = state.cartItems.filter(item => {
                priceItem = item.itemPrice * item.itemQuantity;
                return item._id !== action.payload;
            })
            state.cartItems = newCart;
            state.total -= priceItem;
        }

    },
    extraReducers(builder) {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                // action.payload.data.map((item: any) => {
                //     state.cartItems.push(item)
                // })
                if (action.payload) {
                    state.cartItems = action.payload.data;
                    state.total = state.cartItems.reduce((acc, item) => acc + (item.itemPrice * item.itemQuantity), 0);
                }

                // localStorage.setItem("cart", JSON.stringify(action.payload.data))
            })
    },

})


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;


export const addToCart = createAsyncThunk("cart/addToCart", async (items: any) => {
    try {
        console.log(items);
        
        const response = await addToCartAPI(items);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const getCart = createAsyncThunk("cart/getCart", async () => {
    try {
        const response = await getCartAPI();
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const removeCart = createAsyncThunk("cart/removeCart", async (id: string) => {
    try {
        const response = await removeCartAPI(id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})