import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { forgotPassword as forgotPasswordApi } from '../../../utils/burger-api';
import { SliceActions } from '../../../utils/types';

interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

export const forgotPassword = createAsyncThunk(
  'forgotPassword/forgotPassword',
  async function (email: string, { rejectWithValue, dispatch }) {
    try {
      const res = await forgotPasswordApi<IForgotPasswordResponse>(email);
      dispatch(setForgotPassword(true));
      return res;
    } catch (error) {
      dispatch(setForgotPassword(false));
      return rejectWithValue(error);
    }
  },
);

interface IInitialState {
  forgotPassword: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
}

export const initialState: IInitialState = {
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
export type TForgotPasswordSliceActions = SliceActions<typeof forgotPasswordSlice.actions>;
