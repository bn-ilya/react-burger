import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register as registerApi } from '../../utils/burger-api';

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

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        name: '',
        email: '',
        registerRequest: false,
        registerFailed: false,
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
    }
})

export default profileSlice.reducer;
const {setEmail, setName} = profileSlice.actions;