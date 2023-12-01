import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from '..';

import {
  register as registerApi,
  login as loginApi,
  logout as logoutApi,
  getUserData as getUserDataApi,
  updateUserData as updateUserDataApi,
  refreshToken,
} from '../../../utils/burger-api';
import {
  IError,
  IRefreshRespone,
  SliceActions,
  TEmailUser,
  TNameUser,
  TPasswordUser,
} from '../../../utils/types';

interface IUser {
  email: TEmailUser;
  name: TNameUser;
}

interface IRegisterRespone {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

interface ILoginResponse {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

interface ILogoutRespone {
  success: boolean;
  message: string;
}

interface IGetUserResponse {
  success: boolean;
  user: IUser;
}

interface IInitialState {
  name: TNameUser;
  email: TPasswordUser;
  logoutRequest: boolean;
  logoutFailed: boolean;
  getUserDataRequest: boolean;
  getUserDataFailed: boolean;
  updateUserDataRequest: boolean;
  updateUserDataFailed: boolean;
}

export const initialState: IInitialState = {
  name: '',
  email: '',
  logoutRequest: false,
  logoutFailed: false,
  getUserDataRequest: false,
  getUserDataFailed: false,
  updateUserDataRequest: false,
  updateUserDataFailed: false,
};

export const register = createAsyncThunk<
  IRegisterRespone,
  { email: TEmailUser; password: TPasswordUser; name: TNameUser },
  {
    rejectValue: IError;
    dispatch: AppDispatch;
  }
>('profile/register', async function ({ email, password, name }, { rejectWithValue, dispatch }) {
  try {
    const res = await registerApi<IRegisterRespone>(email, password, name);

    localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
    localStorage.setItem('refreshToken', res.refreshToken);

    dispatch(setName(res.user.name));
    dispatch(setEmail(res.user.email));
    return res;
  } catch (error) {
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

export const login = createAsyncThunk<
  ILoginResponse,
  { email: TEmailUser; password: TPasswordUser },
  {
    rejectValue: IError;
    dispatch: AppDispatch;
  }
>('profile/login', async function ({ email, password }, { rejectWithValue, dispatch }) {
  try {
    const res = await loginApi<ILoginResponse>(email, password);
    localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
    localStorage.setItem('refreshToken', res.refreshToken);

    dispatch(setName(res.user.name));
    dispatch(setEmail(res.user.email));
    return res;
  } catch (error) {
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

export const logout = createAsyncThunk<
  ILogoutRespone,
  undefined,
  {
    rejectValue: IError;
    dispatch: AppDispatch;
  }
>('profile/logout', async function (_, { rejectWithValue, dispatch }) {
  try {
    const res = await logoutApi<ILogoutRespone>();

    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');

    dispatch(setName(initialState.name));
    dispatch(setEmail(initialState.email));
    return res;
  } catch (error) {
    dispatch(setName(initialState.name));
    dispatch(setEmail(initialState.email));
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

export const getUserData = createAsyncThunk<
  IGetUserResponse,
  undefined,
  { rejectValue: IError; dispatch: AppDispatch }
>('profile/getUserData', async function (_, { rejectWithValue, dispatch }) {
  try {
    const res = await getUserDataApi<IGetUserResponse>();
    dispatch(setName(res.user.name));
    dispatch(setEmail(res.user.email));
    return res;
  } catch (error) {
    dispatch(setName(initialState.name));
    dispatch(setEmail(initialState.email));
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

export const updateUserData = createAsyncThunk<
  IGetUserResponse,
  { name: TNameUser; email: TEmailUser; password: TPasswordUser },
  { rejectValue: IError; dispatch: AppDispatch }
>(
  'profile/updateUserData',
  async function ({ name, email, password }, { rejectWithValue, dispatch }) {
    try {
      const res = await updateUserDataApi<IGetUserResponse>(name, email, password);
      dispatch(setName(res.user.name));
      dispatch(setEmail(res.user.email));
      return res;
    } catch (error) {
      const errorObject = error as IError;
      return rejectWithValue(errorObject);
    }
  },
);

export const updateToken = createAsyncThunk<IRefreshRespone>(
  'profile/updateToken',
  async function () {
    const res = await refreshToken<IRefreshRespone>();

    return res;
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<TNameUser>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<TEmailUser>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.getUserDataRequest = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.getUserDataRequest = false;
        state.getUserDataFailed = false;
      })
      .addCase(register.rejected, (state) => {
        state.getUserDataRequest = false;
        state.getUserDataFailed = true;
      })
      .addCase(login.pending, (state) => {
        state.getUserDataRequest = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.getUserDataRequest = false;
        state.getUserDataFailed = false;
      })
      .addCase(login.rejected, (state) => {
        state.getUserDataRequest = false;
        state.getUserDataFailed = true;
      })
      .addCase(logout.pending, (state) => {
        state.logoutRequest = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutRequest = false;
        state.logoutFailed = false;
      })
      .addCase(logout.rejected, (state) => {
        state.logoutRequest = false;
        state.logoutFailed = true;
      })
      .addCase(getUserData.pending, (state) => {
        state.getUserDataRequest = true;
      })
      .addCase(getUserData.fulfilled, (state) => {
        state.getUserDataRequest = false;
        state.getUserDataFailed = false;
      })
      .addCase(getUserData.rejected, (state) => {
        state.getUserDataRequest = false;
        state.getUserDataFailed = true;
      })
      .addCase(updateUserData.pending, (state) => {
        state.updateUserDataRequest = true;
      })
      .addCase(updateUserData.fulfilled, (state) => {
        state.updateUserDataRequest = false;
        state.updateUserDataFailed = false;
      })
      .addCase(updateUserData.rejected, (state) => {
        state.updateUserDataRequest = false;
        state.updateUserDataFailed = true;
      });
  },
});

export default profileSlice.reducer;
export const { setEmail, setName } = profileSlice.actions;
export type TProfileSliceActions = SliceActions<typeof profileSlice.actions>;
