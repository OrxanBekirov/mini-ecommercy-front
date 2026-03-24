import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAdminProducts, createProduct, deleteProduct, updateProduct } from "../../../api/adminProductApi";

export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchAdminProducts", async (_, thunkAPI) => {
        try {
            const res = await getAllAdminProducts();
            return res.data.data || res.data
        } catch (error) {
            return thunkAPI.rejectWithValue("AdminProduct Alinmadi");
        }
    }
)
export const createAdminProduct = createAsyncThunk(
    "adminProducts/CreateProduct", async (dto, thunkAPI) => {
        try {
            await createProduct(dto);
            thunkAPI.dispatch(fetchAdminProducts);
        } catch (error) {
            return thunkAPI.rejectWithValue("Product yaradila bilmedi")
        }
    }
)
export const deleteAdminProduct = createAsyncThunk(
    "adminProducts/DeleteProduct", async (id, thunkAPI) => {
        try {
            await deleteProduct(id);
            thunkAPI.dispatch(fetchAdminProducts())
        } catch (error) {
            return thunkAPI.rejectWithValue("Product Siline bilmedi")
        }
    }
)
export const updateAdminProduct = createAsyncThunk(
    "adminProducts/updateAdminProduct",
    async ({ id, dto }, thunkAPI) => {
        try {
            await updateProduct(id, dto);
            thunkAPI.dispatch(fetchAdminProducts());
        } catch (err) {
            return thunkAPI.rejectWithValue("Product yenilənə bilmədi");
        }
    }
);
const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        items: [],
        loading: false,
        error: null,
        creating: null

    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error";
            }).addCase(createAdminProduct.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createAdminProduct.fulfilled, (state) => {
                state.creating = false;
            })
            .addCase(createAdminProduct.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload || "Product yaradıla bilmədi";
            });;
    }
})

export default adminProductSlice.reducer