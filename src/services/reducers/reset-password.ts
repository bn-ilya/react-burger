import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { resetPassword as resetPasswordApi } from '../../utils/burger-api';

export const resetPassword = createAsyncThunk(
  'resetPassword/resetPassword',
  async function ({ password, token }: any, { rejectWithValue }) {
    try {
      const res = await resetPasswordApi(password, token);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordRequest = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordRequest = false;
        state.resetPasswordFailed = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.resetPasswordRequest = false;
        state.resetPasswordFailed = true;
      });
  },
});

export default resetPasswordSlice.reducer;
