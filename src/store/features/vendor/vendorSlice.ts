import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICreateVendor, IVendorState } from "./vendorTypes";
import { UpdateBanner, UpdateVendorInfo, createVendorApi, getVendorByID } from "@/api/vendorApi";

const initialState: IVendorState = {
    data: null,
    loading: true,
}

const vendorSlice = createSlice({
    initialState,
    name: "vendor",
    reducers: {
        createVendor: (state, action: PayloadAction<ICreateVendor>) => {

        }
    },
    extraReducers(builder) {
        builder
            .addCase(createVendor.pending, (state) => {
                state.loading = true
            })
            .addCase(createVendor.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false
            })

            .addCase(fetchVendorInfo.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchVendorInfo.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })

            .addCase(UpdateVendorBanner.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(UpdateVendorBanner.pending, (state) => {
                state.loading = true
            })

            .addCase(UpdateVendor.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(UpdateVendor.pending, (state) => {
                state.loading = true
            })
    },
})

export const createVendor = createAsyncThunk(
    'vendor/createVendor',
    async (credentials: any) => {
        try {
            const response = await createVendorApi(credentials)
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const UpdateVendorBanner = createAsyncThunk(
    "vendor/UpdateVendorBanner",
    async (image: any) => {
        try {
            const response = await UpdateBanner(image);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchVendorInfo = createAsyncThunk(
    "vendor/getVendorByID",
    async (vendorID: string) => {
        try {
            const response = await getVendorByID(vendorID);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const UpdateVendor = createAsyncThunk(
    "vendor/UpdateVendor",
    async (credentials: any) => {
        try {
            const response = await UpdateVendorInfo(credentials);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const authActions = vendorSlice.actions;
export default vendorSlice.reducer;