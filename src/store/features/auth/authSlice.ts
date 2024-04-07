import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "./authTypes";
import { verifyAPI } from "@/api/authApi";
import { changePasswordAPI, editUserAPI } from "@/api/userApi";

const initialState: IAuthState = {
	isLogged: false,
	data: null,
	loading: false,
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

			.addCase(editUser.pending, (state) => {
				state.loading = true
			})

			.addCase(editUser.fulfilled, (state, action) => {
				state.loading = false
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
})

export const changePassword = createAsyncThunk("auth/changePassword", async ({ userID, password }: { userID: string, password: string }) => {
	try {
		const response = await changePasswordAPI(userID, password);
		return response;
	}
	catch (error: any) {
		console.log(error);
	}
})

export const editUser = createAsyncThunk("auth/editUser", async ({ userID, username }: { userID: string, username: string }) => {
	try {
		const response = await editUserAPI(userID, username);
		return response.data;
	}
	catch (error: any) {
		console.log(error);
	}
})



export const authActions = authSlice.actions;
export default authSlice.reducer;