import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from '.';

import { forgotPassword as forgotPasswordApi } from '../../utils/burger-api';
import { IError } from '../../utils/types';

interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

interface IInitialState {
  forgotPassword: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
}

export const forgotPassword = createAsyncThunk<
  IForgotPasswordResponse,
  string,
  { dispatch: AppDispatch; rejectValue: IError }
>('forgotPassword/forgotPassword', async function (email, { rejectWithValue, dispatch }) {
  try {
    const res = await forgotPasswordApi<IForgotPasswordResponse>(email);
    dispatch(setForgotPassword(true));
    return res;
  } catch (error) {
    dispatch(setForgotPassword(false));
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

const initialState: IInitialState = {
  forgotPassword: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setForgotPassword: (state, action: PayloadAction<boolean>) => {
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
