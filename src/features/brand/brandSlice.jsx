import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBrands, createBrandApi, deleteBrandApi, updateBrandApi } from "../../api/adminBrandApi"



export const fetchAdminBrands = createAsyncThunk(
    "adminBrands/fetchAdminBrands",
    async (_, thunkApi) => {
        try {
            const res = await getAllBrands();
            return res
        } catch (error) {
            return thunkApi.rejectWithValue("Brands alinmadi");
        }
    }
);

export const createAdminBrand = createAsyncThunk(
    "adminBrands/createAdminBrand",
    async (dto, thunkApi) => {
        try {
            await createBrandApi(dto);
            thunkApi.dispatch(fetchAdminBrands());

        } catch (error) {
            return thunkApi.rejectWithValue("Brand yaradila bilmedi");
        }
    }
);

export const updateAdminBrand = createAsyncThunk(
    "adminBrands/updateAdminBrand",
    async ({ id, dto }, thunkApi) => {
        try {
            const res = await updateBrandApi(id, dto);
            thunkApi.dispatch(fetchAdminBrands());
            return res
        } catch (error) {
            return thunkApi.rejectWithValue("Brand deyisdirile bilmedi");
        }
    }
);

export const deleteAdminBrand = createAsyncThunk(
    "adminBrands/deleteAdminBrand",
    async (id, thunkApi) => {
        try {
            const res = await deleteBrandApi(id);
            thunkApi.dispatch(fetchAdminBrands());

            return res
        } catch (error) {
            return thunkApi.rejectWithValue("Brand siline bilmedi");
        }
    }
);

const adminBrandSlice = createSlice({
    name: "adminBrands",
    initialState: {
        items: [],
        loading: false,
        error: null,
        saving: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAdminBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error";
            })

            .addCase(createAdminBrand.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(createAdminBrand.fulfilled, (state) => {
                state.saving = false;
            })
            .addCase(createAdminBrand.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload;
            })

            .addCase(updateAdminBrand.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(updateAdminBrand.fulfilled, (state) => {
                state.saving = false;
            })
            .addCase(updateAdminBrand.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload;
            })

            .addCase(deleteAdminBrand.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(deleteAdminBrand.fulfilled, (state) => {
                state.saving = false;
            })
            .addCase(deleteAdminBrand.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload;
            });
    }
});

export default adminBrandSlice.reducer;