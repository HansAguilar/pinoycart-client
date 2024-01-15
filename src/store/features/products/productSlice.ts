import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "./productTypes";

interface IProductState {
	loading: boolean;
	products: IProduct[]
}

const initialState: IProductState = {
	loading: true,
	products: []
}

const productSlice = createSlice({
	initialState,
	name: "product",
	reducers: {
		getAllProducts: (state) => {
			return state
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAllProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.data;
			})
	},
})

export const fetchAllProducts = createAsyncThunk(
	'product/fetchAll',
	async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get("http://localhost:3000/api/v1/get-items", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
)

export const authActions = productSlice.actions;
export default productSlice.reducer;