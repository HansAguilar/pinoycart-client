import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICreateVendor, IVendorState } from "./vendorTypes";
import { UpdateBannerAPI, UpdateVendorInfo, createVendorApi, getVendorByID } from "@/api/vendorApi";

const initialState: IVendorState = {
    data: null,
    loading: true,
    items: [],
    msg: ""
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
            .addCase(createVendor.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createVendor.fulfilled, (state, action) => {
                state.loading = false
                state.msg = action.payload.message
                state.items = []
            })

            .addCase(fetchVendorInfo.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchVendorInfo.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
                state.items = action.payload.vendorItems
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
    async ({ image, vendorID }: { image: File, vendorID: string }) => {
        try {
            const response = await UpdateBannerAPI(image, vendorID);
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
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

export const UpdateVendor = createAsyncThunk(
    "vendor/UpdateVendor",
    async ({ vendorName, vendorDesc, vendorID }: { vendorName: string, vendorDesc: string, vendorID: string }) => {
        try {
            const response = await UpdateVendorInfo(vendorName, vendorDesc, vendorID);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const authActions = vendorSlice.actions;
export default vendorSlice.reducer;