import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMyOrdersApi,
    cancelOrderApi,
    createOrderFromCart,
    getOrderByIdApi
} from "../../api/orderApi";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    creating: false,
    createdOrder: null,
    selectedOrder: null
};

export const fetchOrderById = createAsyncThunk(
    "orders/fetchOrderById",
    async (id, thunkAPI) => {
        try {
            const res = await getOrderByIdApi(id);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Sifariş detalları alınmadı"
            );
        }
    }
);

export const createMyOrderThunk = createAsyncThunk(
    "orders/createOrder",
    async (orderData, thunkAPI) => {
        try {
            const response = await createOrderFromCart(orderData);
            return response.data || response;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Order yaradıla bilmədi"
            );
        }
    }
);

export const getMyOrdersThunk = createAsyncThunk(
    "orders/getMyOrders",
    async (_, thunkAPI) => {
        try {
            const data = await getMyOrdersApi();
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Sifarişlər gətirilə bilmədi"
            );
        }
    }
);

export const cancelOrderThunk = createAsyncThunk(
    "orders/cancelOrder",
    async ({ orderId, reason }, thunkAPI) => {
        try {
            const data = await cancelOrderApi(orderId, reason);
            return { orderId, result: data };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Sifariş ləğv edilə bilmədi"
            );
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearCreatedOrder: (state) => {
            state.createdOrder = null;
        },
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyOrdersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getMyOrdersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(cancelOrderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                const order = state.orders.find(item => item.id === action.payload.orderId);
                if (order) order.orderStatus = "Cancelled";
            })
            .addCase(cancelOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCreatedOrder, clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;