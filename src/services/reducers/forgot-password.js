import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword as forgotPasswordApi } from "../../utils/burger-api";

export const forgotPassword = createAsyncThunk(
    "forgotPassword/forgotPassword",
    async function (email, { rejectWithValue }) {
        try {
            const res = await forgotPasswordApi(email);

            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordFailed: false
}

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    extraReducers: buider => {
        buider
            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordRequest = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = false
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = true
            })
    }
})

export default forgotPasswordSlice.reducer;
export const { setFieldValue } = forgotPasswordSlice.actions;