import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "./cartTypes";
import { addToCartAPI, getCartAPI } from "@/api/userApi";

const intialState: ICart = {
    cartItems: []
}

const cartSlice = createSlice({
    initialState: intialState,
    name: "cart",
    reducers: {
        addToCart: (state, action: PayloadAction<{ itemID: string, itemQuantity: number }>) => {
            state.cartItems.push({
                itemID: action.payload.itemID,
                itemQuantity: action.payload.itemQuantity,
            })
        }

    },
    extraReducers(builder) {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartItems.push(action.payload.data)
            })
    },

})


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;


export const addToCart = createAsyncThunk("cart/addToCart", async (items: any) => {
    try {
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