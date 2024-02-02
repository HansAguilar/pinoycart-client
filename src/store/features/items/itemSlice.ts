import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IItemsState } from "./itemTypes";
import { addItemApi, getItemByIDAPI } from "@/api/itemsApi";


const initialState: IItemsState = {
	loading: true,
	items: [],
	currentItem: null
}

const itemSlice = createSlice({
	initialState,
	name: "items",
	reducers: {
		getAllProducts: (state) => {
			return state
		},
		getProductByID: (state, action) => {

		}
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

			.addCase(getItemByID.fulfilled, (state, action) => {
				state.currentItem = action.payload;
				state.loading = false;
			})

			.addCase(getItemByID.pending, (state) => {
				state.loading = true;
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

export const getItemByID = createAsyncThunk(
	"items/getItem",
	async (itemID: any) => {
		try {
			const response = await getItemByIDAPI(itemID);
			return response.data.getItem;
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