import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register as registerApi, login as loginApi, logout as logoutApi, getUserData as getUserDataApi, updateUserData as updateUserDataApi } from '../../utils/burger-api';

const initialState = {
    name: '',
    email: '',
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    getUserDataRequest: false,
    getUserDataFailed: false,
    updateUserDataRequest: false,
    updateUserDataFailed: false
}

export const register = createAsyncThunk(
    "profile/register",
    async function ({ email, password, name }, { rejectWithValue, dispatch }) {
        try {
            const res = await registerApi(email, password, name);
            dispatch(setName(res.user.name));
            dispatch(setEmail(res.user.email));
            return res;
        } catch (error) {
            return rejectWithValue(error);
        };
    }
)

export const login = createAsyncThunk(
    "profile/login",
    async function ({ email, password }, { rejectWithValue, dispatch }) {
        try {
            const res = await loginApi(email, password);
            dispatch(setName(res.user.name))
            dispatch(setEmail(res.user.email));
            return res;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const logout = createAsyncThunk(
    "profile/logout",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const res = await logoutApi();
            dispatch(setName(initialState.name));
            dispatch(setEmail(initialState.email));
            return res;
        } catch (error) {
            dispatch(setName(initialState.name));
            dispatch(setEmail(initialState.email));
            return rejectWithValue(error)
        }
    }
)

export const getUserData = createAsyncThunk(
    "profile/getUserData",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const res = await getUserDataApi();
            dispatch(setName(res.user.name));
            dispatch(setEmail(res.user.email));
            return res;
        } catch (error) {
            dispatch(setName(initialState.name));
            dispatch(setEmail(initialState.email));
            return rejectWithValue(error)
        }
    }
)

export const updateUserData = createAsyncThunk(
    "profile/updateUserData",
    async function ({ name, email, password }, { rejectWithValue, dispatch }) {
        try {
            const res = await updateUserDataApi(name, email, password);
            dispatch(setName(res.user.name));
            dispatch(setEmail(res.user.email));
            return res;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.registerRequest = true
            })
            .addCase(register.fulfilled, (state) => {
                state.registerRequest = false;
                state.registerFailed = false;
            })
            .addCase(register.rejected, (state) => {
                state.registerRequest = false;
                state.registerFailed = true
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
                state.logoutRequest = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutRequest = false;
                state.logoutFailed = false;
            })
            .addCase(logout.rejected, (state) => {
                state.logoutRequest = false;
                state.logoutFailed = true
            })
            .addCase(getUserData.pending, (state) => {
                state.getUserDataRequest = true
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
                state.updateUserDataRequest = true
            })
            .addCase(updateUserData.fulfilled, (state) => {
                state.updateUserDataRequest = false;
                state.updateUserDataFailed = false;
            })
            .addCase(updateUserData.rejected, (state) => {
                state.updateUserDataRequest = false;
                state.updateUserDataFailed = true
            })
    }
})

export default profileSlice.reducer;
const { setEmail, setName } = profileSlice.actions;