import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

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
            state.ingredients.push({ ...action.payload, uniqueId: uuid() })
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uniqueId !== action.payload)
        },
        updateIndexIngredients: (state) => {
            state.ingredients = state.ingredients.map((ingredient, index) => ({ ...ingredient, index: index }));
        },
        sortedIngredients: (state) => {
            state.ingredients = state.ingredients.sort((a, b) => {
                return a.index - b.index;
            })
        },
        moveIngredients: (state, action) => {
            state.ingredients.splice(action.payload.dragIndex, 1)
            state.ingredients.splice(action.payload.hoverIndex, 0, action.payload.ingredient)
        }
    }
})

export default ingredientsConstructorSlice.reducer;
export const { setIngredients, setBunTop, setBunBottom, addIngredients, removeIngredient, updateIndexIngredients, moveIngredients, sortedIngredients, changeIndexIngredients } = ingredientsConstructorSlice.actions; 