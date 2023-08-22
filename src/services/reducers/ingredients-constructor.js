import { createSlice } from '@reduxjs/toolkit';

const ingredientsConstructorSlice = createSlice({
    name: 'ingredientsConstructor',
    initialState: {
        ingredients: [],
        bunTop: null,
        bunBottom: null,
    },
    reducers: {
        setIngredients: (state, action) => {
            state.ingredients = action.payload
        },
        setBunTop: (state, action) => {
            state.bunTop = action.payload
        },
        setBunBottom: (state, action) => {
            state.bunBottom = action.payload
        },
        addIngredients: (state, action) => {
            state.ingredients.push({...action.payload, sort: state.ingredients.length})
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.sort !== action.payload)
        }
    }
})

export default ingredientsConstructorSlice.reducer;
export const { setIngredients, setBunTop, setBunBottom, addIngredients, removeIngredient} = ingredientsConstructorSlice.actions; 