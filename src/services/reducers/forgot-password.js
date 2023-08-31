import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword as resetPasswordApi } from "../../utils/burger-api";

export const resetPassword = createAsyncThunk(
    "forgotPassword/resetPassword",
    async function (email, { rejectWithValue }) {
        try {
            const res = await resetPasswordApi(email);

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
            .addCase(resetPassword.pending, (state) => {
                state.forgotPasswordRequest = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = false
            })
            .addCase(resetPassword.rejected, (state) => {
                state.forgotPasswordRequest = false
                state.forgotPasswordFailed = true
            })
    }
})

export default forgotPasswordSlice.reducer;
export const { setFieldValue } = forgotPasswordSlice.actions;