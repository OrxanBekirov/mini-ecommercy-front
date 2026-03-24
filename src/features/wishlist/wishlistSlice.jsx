import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeFromWishlistApi, getWishlistApi, addToWishlistApi } from "../../api/wishlistApi"

const initialState = {
    items: [],
    loading: false,
    error: null
}

export const getWishlistThunk = createAsyncThunk(
    "wishlist/GetAll", async (_, thunkAPI) => {
        try {

            const data = await getWishlistApi();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Wishlist gətirilə bilmədi"
            );
        }
    }
)
export const addToWishlistThunk = createAsyncThunk(
    "wishlist/add",
    async (productId, thunkAPI) => {
        try {
            const res = await addToWishlistApi(productId);
            thunkAPI.dispatch(getWishlistThunk());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Wishlist-ə əlavə edilə bilmədi"
            );
        }
    }
);

export const removeFromWishlistThunk = createAsyncThunk(
    "wishlist/remove",
    async (productId, thunkAPI) => {
        try {
            const res = await removeFromWishlistApi(productId);
            thunkAPI.dispatch(getWishlistThunk());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Wishlist-dən silinə bilmədi"
            );
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWishlistThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getWishlistThunk.fulfilled, (state, action) => {
                console.log("Redux-a girən data:", action.payload)
                state.loading = false;
                // Əgər payload birbaşa massiv deyilsə, onun içindəki 'data'nı götür
                state.items = Array.isArray(action.payload) ? action.payload : (action.payload?.data || []);
            })
            .addCase(getWishlistThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addToWishlistThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(addToWishlistThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(removeFromWishlistThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(removeFromWishlistThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    }

})

export default wishlistSlice.reducer;