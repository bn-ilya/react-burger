import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    email: ''
}

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        setFieldValue: (state, action) => {
            state[action.payload.field] = action.payload.value
        }
    }
})

export default forgotPasswordSlice.reducer;
export const {setFieldValue} = forgotPasswordSlice.actions;