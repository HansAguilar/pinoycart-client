import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICart } from "./cartTypes";
import { addToCartAPI, getCartAPI } from "@/api/userApi";

const intialState: ICart = {
    cartItems: [],
    total: 0
}

const cartSlice = createSlice({
    initialState: intialState,
    name: "cart",
    reducers: {
        // addToCart: (state, action: PayloadAction<{ itemID: string, itemQuantity: number }>) => {
        //     state.cartItems.push({
        //         itemID: action.payload.itemID,
        //         itemQuantity: action.payload.itemQuantity,
        //     })
        // },

        addPrice: (state, action) => {
            state.total += action.payload
        },
        minusPrice: (state, action) => {
            state.total -= action.payload
        },

        //! TODO : remove cart
        // removeCart

    },
    extraReducers(builder) {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                // action.payload.data.map((item: any) => {
                //     state.cartItems.push(item)
                // })

                state.cartItems = action.payload.data;
                state.total = state.cartItems.reduce((acc, item) => acc + item.itemPrice, 0);
                // localStorage.setItem("cart", JSON.stringify(action.payload.data))
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