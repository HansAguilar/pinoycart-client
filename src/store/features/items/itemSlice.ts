import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IItemsState } from "./itemTypes";
import { addItemApi, addReviewAPI, deleteItemByIDAPI, fetchAllItemsAPI, getItemByIDAPI, updateItemByIDAPI } from "@/api/itemsApi";


const initialState: IItemsState = {
	loading: false,
	items: [],
	currentItem: undefined
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
			.addCase(getItemByID.fulfilled, (state, action) => {
				state.currentItem = action.payload;
				state.loading = false;
			})
			.addCase(updateItem.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(getItemByID.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateItem.pending, (state) => {
				state.loading = true;
			})

			.addCase(removeItemByID.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeItemByID.fulfilled, (state) => {
				state.loading = true;
			})

			.addCase(addReview.pending, (state) => {
				state.loading = true;
			})
			.addCase(addReview.fulfilled, (state, action) => {
				state.loading = true;
				state.currentItem = action.payload
			})

	},
})

export const updateItem = createAsyncThunk(
	"items/updateItem",
	async (formdata: any) => {
		try {
			const response = await updateItemByIDAPI(formdata);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
)

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
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
)

export const removeItemByID = createAsyncThunk(
	"items/deleteItem",
	async (itemID: any) => {
		try {
			const response = await deleteItemByIDAPI(itemID);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
)


export const addReview = createAsyncThunk(
	"items/addReview",
	async (data: any) => {
		try {
			const response = await addReviewAPI(data);
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
			const response = await fetchAllItemsAPI();
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
)

export const authActions = itemSlice.actions;
export default itemSlice.reducer;