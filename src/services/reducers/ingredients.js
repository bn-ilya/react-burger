import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Api
import { getIngredients as getIngredientsApi } from '../../utils/burger-api';

export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const res = await getIngredientsApi();
            dispatch(setIngredients(res));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
        buns: [],
        sauces: [],
        mains: [],
        ingredientsRequest: false,
        ingredientsFailed: false
    },
    reducers: {
        setIngredients: (state, action) => {
            state.buns = action.payload.filter(ingredient => ingredient.type === 'bun');
            state.sauces = action.payload.filter(ingredient => ingredient.type === 'sauce');
            state.mains = action.payload.filter(ingredient => ingredient.type === 'main');
        },
        setCountIngredients: (state, action) => {
            state.sauces = state.sauces.map(sauce => action.payload[sauce['_id']] ? { ...sauce, count: action.payload[sauce['_id']] } : { ...sauce, count: null });
            state.mains = state.mains.map(main => action.payload[main['_id']] ? { ...main, count: action.payload[main['_id']] } : { ...main, count: null });
        },
        setCountBuns: (state, action) => {
            state.buns = state.buns.map(bun => action.payload[bun['_id']] ? { ...bun, count: action.payload[bun['_id']] } : { ...bun, count: null });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.pending, (state) => {
                state.ingredientsRequest = true
            })
            .addCase(getIngredients.fulfilled, (state) => {
                state.ingredientsRequest = false
                state.ingredientsFailed = false
            })
            .addCase(getIngredients.rejected, (state) => {
                state.ingredientsRequest = false
                state.ingredientsFailed = true
            })
    }
})

export default ingredientsSlice.reducer;
export const { setIngredients, setCountIngredients, setCountBuns } = ingredientsSlice.actions;