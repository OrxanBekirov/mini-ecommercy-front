import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { decodeToken } from "../../utils/decodeToken"
import { uploadProfileImageApi, getMyProfileImageApi } from "../../api/userApi";

const saveToken = localStorage.getItem("token");
const decode = saveToken ? decodeToken(saveToken) : null;
const savedUserRaw = localStorage.getItem("user");
let savedUser = null;
try {
    // Əgər içindəki string "undefined" və ya xarabdırsa xəta verməsin deyə try-catch
    savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;
} catch (e) {
    savedUser = null;
}
const initialState = {
    token: saveToken || null,
    user: savedUser,
    role: savedUser?.role || null,
    loading: false,
    error: null

};

export const getProfileImageThunk = createAsyncThunk(
    "auth/getProfileImage",
    async (_, thunkAPI) => {
        try {
            const response = await getMyProfileImageApi();
            // Backend-dən gələn cavabı yoxla: 
            // Əgər response birbaşa string-dirsə 'response' qaytar, 
            // yox obyekt daxilindədirsə 'response.imageUrl' (və ya uyğun ad) yaz.
            return response.imageUrl || response.data || response;
        } catch (error) {
            return thunkAPI.rejectWithValue("Yeni şəkil gətirilə bilmədi");
        }
    }
);
export const uploadProfileImageThunk = createAsyncThunk(
    "auth/uploadProfileImage",
    async (file, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append("File", file);

            const response = await uploadProfileImageApi(formData);

            if (response.success) {
                thunkAPI.dispatch(getProfileImageThunk());
            }
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Profil şəkli yüklənə bilmədi"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const token = action.payload;
            state.token = token;
            localStorage.setItem("token", token);

            const decoded = decodeToken(token);
            const userRole = decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded?.role || null;

            const userObj = {
                id: decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                fullName: decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] || decoded?.unique_name,
                email: decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                profileImageUrl: null,// İlkin olaraq
                role: userRole
            };
            state.user = userObj;
            state.role = userRole;

            localStorage.setItem("user", JSON.stringify(userObj));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.role = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },

    }, extraReducers: (builder) => {
        builder.addCase(uploadProfileImageThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getProfileImageThunk.fulfilled, (state, action) => {
                if (state.user && action.payload) {
                    state.user = {
                        ...state.user,
                        profileImageUrl: action.payload
                    };
                    // LocalStorage-i mütləq yenilə ki, refresh edəndə itməsin
                    localStorage.setItem("user", JSON.stringify(state.user));
                }
            })
            .addCase(uploadProfileImageThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;