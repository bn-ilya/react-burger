import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { forgotPassword as forgotPasswordApi } from '../../utils/burger-api';

export const forgotPassword = createAsyncThunk(
  'forgotPassword/forgotPassword',
  async function (email, { rejectWithValue, dispatch }) {
    try {
      const res = await forgotPasswordApi(email);
      dispatch(setForgotPassword(true));
      return res;
    } catch (error) {
      dispatch(setForgotPassword(false));
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  forgotPassword: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setForgotPassword: (state, action) => {
      state.forgotPassword = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordRequest = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordRequest = false;
        state.forgotPasswordFailed = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.forgotPasswordRequest = false;
        state.forgotPasswordFailed = true;
      });
  },
});

export default forgotPasswordSlice.reducer;
export const { setForgotPassword } = forgotPasswordSlice.actions;
