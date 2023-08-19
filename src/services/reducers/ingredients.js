import { createSlice } from '@reduxjs/toolkit';
// Api
import { getIngredients as getIngredientsApi } from '../../utils/burger-api';

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: false
    },
    reducers: {
        setIngredients(state, action) {
            state.ingredients = action.payload
        },
        setIngredientsRequest(state, action) {
            state.ingredientsRequest = action.payload
        },
        setIngredientsFailed(state, action) {
            state.ingredientsFailed = action.payload
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
export const { setIngredients, setIngredientsFailed, setIngredientsRequest } = ingredientsSlice.actions;