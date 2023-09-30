import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch } from '.';

import { resetPassword as resetPasswordApi } from '../../utils/burger-api';
import { IError, TPasswordUser } from '../../utils/types';

interface IResetPasswordRespone {
  message: string;
  success: boolean;
}

export const resetPassword = createAsyncThunk<
  IResetPasswordRespone,
  { password: TPasswordUser; token: string },
  { rejectValue: IError; dispatch: AppDispatch }
>('resetPassword/resetPassword', async function ({ password, token }, { rejectWithValue }) {
  try {
    const res = await resetPasswordApi<IResetPasswordRespone>(password, token);

    return res;
  } catch (error) {
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

interface IInitialState {
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
}

const initialState: IInitialState = {
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
