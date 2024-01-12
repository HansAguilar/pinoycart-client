import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./authTypes";

const initialState: IAuthState = { isLogged: false, data: null, loading: true }

const authSlice = createSlice({
    initialState: initialState,
    name: "auth",
    reducers: {
        isAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload
            state.loading = false
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;