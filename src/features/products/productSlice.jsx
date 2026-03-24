import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getProductById } from "../../api/productApi";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, thunkAPI) => {
        try {
            const res = await getAllProducts();
            return res.data?.data || res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("Məhsullar yüklənmədi");
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchProductById",
    async (id, thunkAPI) => {
        try {
            const res = await getProductById(id);
            // res.data.data strukturunuza uyğun olaraq:
            return res.data?.data || res.data;
        } catch (error) {
            // BURADA return MÜTLƏQDİR:
            return thunkAPI.rejectWithValue("Məhsul detalları alınmadı");
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
        selectedProduct: null,
    },
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Xəta baş verdi";
            })
            // Fetch Single Product
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Xəta baş verdi";
            });
    }
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;