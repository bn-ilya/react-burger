import { createSlice } from '@reduxjs/toolkit';

const ingredientsConstructorSlice = createSlice({
    name: 'ingredientsConstructor',
    initialState: {
        ingredients: [],
        bunTop: null,
        bunBottom: null,
    },
    reducers: {
        addingredients: (state, action) => {
            state.ingredients = action.payload
        },
        setBunTop: (state, action) => {
            state.bunTop = action.payload
        },
        setBunBottom: (state, action) => {
            state.bunBottom = action.payload
        }
    }
})

export default ingredientsConstructorSlice.reducer;
export const { addingredients, setBunTop, setBunBottom } = ingredientsConstructorSlice.actions; 