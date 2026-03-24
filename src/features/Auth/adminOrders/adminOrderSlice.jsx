import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAdminOrders, updateOrderStatus } from "../../../api/adminOrderApi"

export const fetchAdminOrders = createAsyncThunk(
    "adminOrders/fetchAdminOrders",
    async (_, thunkApi) => {
        try {
            const res = await getAllAdminOrders();
            // Backend-dən gələn data strukturuna uyğun olaraq
            return res.data?.data || res.data;
        } catch (error) {
            return thunkApi.rejectWithValue("Sifarişlər yüklənmədi");
        }
    }
);

export const changeOrderStatus = createAsyncThunk(
    "adminOrders/changeOrderStatus", // Ad düzəldildi
    async ({ id, status }, thunkApi) => {
        try {
            const res = await updateOrderStatus(id, status);
            return res.data?.data || res.data; // Yenilənmiş order-i qaytarır
        } catch (error) {
            return thunkApi.rejectWithValue("Status yenilənmədi");
        }
    }
);

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Orders
        builder.addCase(fetchAdminOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchAdminOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAdminOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Change Status - State-i dərhal yeniləmək üçün
            .addCase(changeOrderStatus.fulfilled, (state, action) => {
                // action.payload-da backend-dən gələn yenilənmiş tək bir order var
                const updatedOrder = action.payload;
                const index = state.items.findIndex(o => o.id === updatedOrder.id);
                if (index !== -1) {
                    state.items[index] = updatedOrder; // Siyahıda həmin order-i yeniləyirik
                }
            });
    }
})

export default adminOrderSlice.reducer;