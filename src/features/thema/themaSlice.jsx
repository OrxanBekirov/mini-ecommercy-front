import { createSlice } from '@reduxjs/toolkit'
const savedMode = localStorage.getItem("themeMode") || "light"
const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: savedMode,
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("themeMode", state.mode)
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;