import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllCategory,
    createCategoryApi,
    updateCategoryApi,
    deleteCategoryApi,
} from "../../api/categoryApi";

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

export const getAllCategoriesThunk = createAsyncThunk(
    "categories/getAll",
    async (_, thunkAPI) => {
        try {
            const data = await getAllCategory();
            return data.data || data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Category-lər gətirilə bilmədi"
            );
        }
    }
);

export const createCategoryThunk = createAsyncThunk(
    "categories/create",
    async (categoryData, thunkAPI) => {
        try {
            const data = await createCategoryApi(categoryData);
            return data.data || data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Category yaradıla bilmədi"
            );
        }
    }
);

export const updateCategoryThunk = createAsyncThunk(
    "categories/update",
    async ({ id, categoryData }, thunkAPI) => {
        try {
            const data = await updateCategoryApi(id, categoryData);
            return data.data || data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Category yenilənə bilmədi"
            );
        }
    }
);

export const deleteCategoryThunk = createAsyncThunk(
    "categories/delete",
    async (id, thunkAPI) => {
        try {
            await deleteCategoryApi(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Category silinə bilmədi"
            );
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategoriesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategoriesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createCategoryThunk.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(createCategoryThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                const index = state.categories.findIndex((x) => x.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updateCategoryThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.categories = state.categories.filter((x) => x.id !== action.payload);
            })
            .addCase(deleteCategoryThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;