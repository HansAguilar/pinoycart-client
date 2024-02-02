import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice";
import itemSlice from "./features/items/itemSlice";
import vendorSlice from "./features/vendor/vendorSlice";
import cartSlice from "./features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        items: itemSlice,
        vendor: vendorSlice,
        cart: cartSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;