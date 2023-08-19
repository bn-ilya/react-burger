import {createSlice} from '@reduxjs/toolkit';

const ingredientsConstructor = createSlice({
    name: 'ingredientsConstructor',
    initialState: {
        ingredientsConstructor: []
    },
    reducers: {
        addIngredientConstructor: (state, action) => {
            state.ingredientsConstructor.push(action.payload)
        }
    }
})

export default ingredientsConstructor.reducer;
export const {addIngredientConstructor} = ingredientsConstructor.actions; 