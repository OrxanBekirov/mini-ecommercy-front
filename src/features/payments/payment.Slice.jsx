import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCheckoutSessionApi } from '../../api/paymentApi';

export const createCheckoutSessionThunk = createAsyncThunk(
    "payment/createCheckoutSession",
    async (orderId, thunkAPI) => {
        try {
            const response = await createCheckoutSessionApi(orderId);

            // Sənin göndərdiyin struktura əsasən: response.url.checkoutUrl
            // Əgər api.js-də "return response.data" yazmısansa, struktur belə olacaq:
            const data = response.data || response;

            if (data && data.url && data.url.checkoutUrl) {
                return { checkoutUrl: data.url.checkoutUrl };
            }

            // Alternativ ehtimal (əgər birbaşa url obyektidirsə)
            if (data && data.checkoutUrl) {
                return { checkoutUrl: data.checkoutUrl };
            }

            return thunkAPI.rejectWithValue("Stripe linki məlumatın içində tapılmadı.");
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Xəta baş verdi");
        }
    }
);
export const markPaymentSuccessThunk = createAsyncThunk(
    "payment/markSuccess",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await markPaymentSuccess(orderId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const PaymentSlice = createSlice({
    name: "payment",
    initialState: {
        paying: false,
        error: null,
        loading: false,
        checkoutUrl: null
    },
    reducers: {
        clearPaymentState: (state) => {
            state.loading = false;
            state.error = null;
            state.checkoutUrl = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckoutSessionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.checkoutUrl = null;
            })
            .addCase(createCheckoutSessionThunk.fulfilled, (state, action) => {
                state.loading = false;
                // BURADA YOXLA: action.payload varmı?
                if (action.payload && action.payload.checkoutUrl) {
                    state.checkoutUrl = action.payload.checkoutUrl;
                } else {
                    state.error = "Stripe linki tapılmadı";
                }
            })
            .addCase(createCheckoutSessionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Xəta baş verdi";
            });
    }
});

export const { clearPaymentState } = PaymentSlice.actions;
export default PaymentSlice.reducer;