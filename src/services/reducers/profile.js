import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register as registerApi, login as loginApi, logout as logoutApi } from '../../utils/burger-api';

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
            dispatch(setName(''))
            dispatch(setEmail(''));
            return res;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        name: '',
        email: '',
        registerRequest: false,
        registerFailed: false,
        loginRequest: false,
        loginFailed: false,
        logoutRequest: false,
        logoutFailed: false
    },
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
                state.loginRequest = true
            })
            .addCase(login.fulfilled, (state) => {
                state.loginRequest = false;
                state.loginFailed = false;
            })
            .addCase(login.rejected, (state) => {
                state.loginRequest = false;
                state.loginFailed = true
            })
            .addCase(logout.pending, (state) => {
                state.logoutRequest = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutRequest = false;
                state.logoutFailed = false;
            })
            .addCase(logout.rejected, (state) => {
                state.logoutRequestlogoutRequest = false;
                state.logoutFailed = true
            })
    }
})

export default profileSlice.reducer;
const { setEmail, setName } = profileSlice.actions;