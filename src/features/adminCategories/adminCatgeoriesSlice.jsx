import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCatgeory, deleteCategory, getAllAdminCatgeories, updateCatgeory } from "../../api/adminCategoryApi"

export const fetchAdminCategories = createAsyncThunk(
    "adminCatgeories/fetchAminCategories", async (_, thunkApi) => {
        try {
            const res = await getAllAdminCatgeories();
            return res;
        } catch (error) {
            return thunkApi.rejectWithValue("Category Tapilmadi")
        }
    }
)
export const updateAdminCategory = createAsyncThunk(
    "/adminCategories/updateAdminCategory", async ({ id, dto }, thunkApi) => {
        try {
            const res = await updateCatgeory(id, dto);
            thunkApi.dispatch(fetchAdminCategories());
            return res;

        } catch (error) {
            return thunkApi.rejectWithValue("Catgeory yenile bilmedi")
        }
    }
)

export const deleteAdminCategory = createAsyncThunk(
    "/adminCategories/deleteAdminCategory", async (id, thunkApi) => {
        try {
            const res = await deleteCategory(id);
            thunkApi.dispatch(fetchAdminCategories());
            return res;

        } catch (error) {
            return thunkApi.rejectWithValue("Catgeory siline  bilmedi")
        }
    }
)
export const createAdminCategory = createAsyncThunk(
    "/adminCategories/createAdminCategory", async (dto, thunkApi) => {
        try {
            const res = await createCatgeory(dto);
            thunkApi.dispatch(fetchAdminCategories());
            return res;

        } catch (error) {
            return thunkApi.rejectWithValue("Catgeory yaradila bilmedi")
        }
    }
)
const adminCategoriesSlice = createSlice({
    name: "adminCategories",
    initialState: {
        items: [],
        loading: false,
        error: null,
        saving: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAdminCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createAdminCategory.pending, (state) => {
                state.saving = true;
            })
            .addCase(createAdminCategory.fulfilled, (state) => {
                state.saving = false;
            })
            .addCase(createAdminCategory.rejected, (state, action) => {
                state.saving = false;
                state.error = action.payload;
            });
    }
})

export default adminCategoriesSlice.reducer;