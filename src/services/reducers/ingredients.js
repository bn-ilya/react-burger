import { createSlice } from '@reduxjs/toolkit';

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
        ingredients: []
    },
    reducers: {
        setIngredients(state, action) {
            state.ingredients = action.payload
        }
    }
})

export default ingredientsSlice.reducer;
export const {setIngredients} = ingredientsSlice.actions;