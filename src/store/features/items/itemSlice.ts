import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IItemsState } from "./itemTypes";
import { addItemApi } from "@/api/itemsApi";


const initialState: IItemsState = {
	loading: true,
	items: []
}

const itemSlice = createSlice({
	initialState,
	name: "items",
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
				state.items = action.payload.data;
			})
	},
})


export const addItem = createAsyncThunk(
	"items/addItem",
	async (items: any) => {
		try {
			const response = await addItemApi(items);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
)

export const fetchAllProducts = createAsyncThunk(
	'items/fetchAll',
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

export const authActions = itemSlice.actions;
export default itemSlice.reducer;