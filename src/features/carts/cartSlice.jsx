import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCarts } from "../../api/cartApi";
import { addToCart } from "../../api/cartApi";
import { updateCartItem, removeCartItem } from "../../api/cartApi";
export const fetchMyCart = createAsyncThunk("cart/fetchMycart", async (_, thunkAPI) => {
    try {

        const res = await getAllCarts();

        return res.data.data || res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Cart Alinmadi")
    }
});
//AddToCart
export const addCartItem = createAsyncThunk(
    "cart/addCartItem",
    async (data, thunkAPI) => {
        try {
            await addToCart(data);
            const res = await thunkAPI.dispatch(fetchMyCart()).unwrap();
            return res; // updated cart
        } catch (err) {
            return thunkAPI.rejectWithValue("Cart əlavə olunmadı");
        }
    }
);
export const updateCartItemThunk = createAsyncThunk(
    "cart/updateCartItem",
    async (data, thunkAPI) => {
        try {
            await updateCartItem(data);
            const res = await thunkAPI.dispatch(fetchMyCart()).unwrap();
            return res; // updated cart
        } catch (err) {
            return thunkAPI.rejectWithValue("Cart update alınmadı");
        }
    }
);
export const removeCartItemThunk = createAsyncThunk(
    "cart/removeCartItem",
    async (id, thunkAPI) => {
        try {
            await removeCartItem(id);
            const res = await thunkAPI.dispatch(fetchMyCart()).unwrap();
            return res; // updated cart
        } catch (err) {
            return thunkAPI.rejectWithValue("Cart item silinmədi");
        }
    }
);
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchMyCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error";
            }).addCase(addCartItem.fulfilled, (state, action) => {
                state.cart = action.payload;
            })
            .addCase(updateCartItemThunk.fulfilled, (state, action) => {
                state.cart = action.payload;
            })
            .addCase(removeCartItemThunk.fulfilled, (state, action) => {
                state.cart = action.payload;
            });
    }
})
export default cartSlice.reducer;
