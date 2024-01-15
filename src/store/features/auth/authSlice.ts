import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./authTypes";
import { verifyAPI } from "@/api/authApi";

const initialState: IAuthState = {
	isLogged: false,
	data: null,
	loading: true,
}

const authSlice = createSlice({
	initialState: initialState,
	name: "auth",
	reducers: {
		isAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isLogged = action.payload
			state.loading = false
		},
	},
	extraReducers(builder) {
		builder
			.addCase(verifyToken.pending, (state) => {
				state.loading = true
				state.isLogged = false
			})

			.addCase(verifyToken.fulfilled, (state, action) => {
				state.loading = false
				state.isLogged = true
				state.data = action.payload
			})
	}
})

export const verifyToken = createAsyncThunk("auth/verifyToken", async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await verifyAPI(token);
		return response;
	}
	catch (error: any) {
		console.log(error);
	}
}
)

export const authActions = authSlice.actions;
export default authSlice.reducer;