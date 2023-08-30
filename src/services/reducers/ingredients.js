import { createSlice } from '@reduxjs/toolkit';
// Api
import { getIngredients as getIngredientsApi } from '../../utils/burger-api';

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
        setIngredientsRequest: (state, action) => {
            state.ingredientsRequest = action.payload
        },
        setIngredientsFailed: (state, action) => {
            state.ingredientsFailed = action.payload
        },
        setCountIngredients: (state, action) => {
            state.sauces = state.sauces.map(sauce => action.payload[sauce['_id']] ? { ...sauce, count: action.payload[sauce['_id']] } : {...sauce, count: null});
            state.mains = state.mains.map(main => action.payload[main['_id']] ? { ...main, count: action.payload[main['_id']] } : {...main, count: null});
        },
        setCountBuns: (state, action) => {
            state.buns = state.buns.map(bun => action.payload[bun['_id']] ? { ...bun, count: action.payload[bun['_id']] } : {...bun, count: null});
        }
    }
})

export const getIngredients = () => {
    return (dispatch) => {
        dispatch(setIngredientsRequest(true));
        getIngredientsApi()
            .then(data => {
                dispatch(setIngredients(data))
                dispatch(setIngredientsFailed(false))
            })
            .catch(() => {
                dispatch(setIngredientsFailed(true))
            })
            .finally(() => {
                dispatch(setIngredientsRequest(false))
            })
    }
}

export default ingredientsSlice.reducer;
export const { setIngredients, setIngredientsFailed, setIngredientsRequest, setCountIngredients, setCountBuns } = ingredientsSlice.actions;