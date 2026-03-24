import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImage, deleteImage, getProductImages } from "../../api/mediaApi";

// 1. Şəkilləri gətirmək
export const fetchProductImages = createAsyncThunk(
    "media/fetchMediaImages", async (productId, thunkAPI) => {
        try {
            const res = await getProductImages(productId);
            // API strukturuna görə res.data və ya res.data.data ola bilər
            return res.data.data || res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Şəkillər alınmadı"); // Düzəldildi
        }
    }
);

// 2. Şəkil yükləmək
export const uploadProductImage = createAsyncThunk( // Ad kiçik hərflə başlasa daha yaxşıdır
    "media/uploadMediaImage", async ({ file, isMain, productId }, thunkAPI) => {
        try {
            const formData = new FormData(); // FormData düzəldildi
            formData.append("File", file);
            formData.append("OwnerType", 1);
            formData.append("OwnerId", productId);
            formData.append("IsMain", isMain ?? false);

            await uploadImage(formData);
            // Yükləmə bitəndən sonra siyahını yeniləyirik
            thunkAPI.dispatch(fetchProductImages(productId));
        } catch (error) {
            return thunkAPI.rejectWithValue("Şəkil yüklənmədi");
        }
    }
);

// 3. Şəkil silmək
export const deleteProductImage = createAsyncThunk(
    "media/deleteProductImage", async ({ imageId, productId }, thunkAPI) => {
        try {
            await deleteImage(imageId);
            // Silinmə bitəndən sonra siyahını yeniləyirik
            thunkAPI.dispatch(fetchProductImages(productId));
        } catch (error) {
            return thunkAPI.rejectWithValue("Şəkil silinmədi");
        }
    }
);

const mediaSlice = createSlice({
    name: "media",
    initialState: {
        items: [],
        loading: false,
        error: null,
        uploading: false
    },
    reducers: {
        clearMedia: (state) => {
            state.items = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cases
            .addCase(fetchProductImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductImages.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProductImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Upload cases
            .addCase(uploadProductImage.pending, (state) => {
                state.uploading = true;
                state.error = null;
            })
            .addCase(uploadProductImage.fulfilled, (state) => {
                state.uploading = false;
            })
            .addCase(uploadProductImage.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload;
            })
            // Delete case
            .addCase(deleteProductImage.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearMedia } = mediaSlice.actions;
export default mediaSlice.reducer;