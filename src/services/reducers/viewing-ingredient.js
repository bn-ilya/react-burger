import {createSlice} from '@reduxjs/toolkit';

const viewingIngredientSlice = createSlice({
    name: 'viewingIngredient',
    initialState: {
        viewingIngredient: {}
    },
    reducers: {
        setViewingIngredient: (state, action) => {
            state.viewingIngredient = action.payload
        }
    }
})

export default viewingIngredientSlice.reducer;
export const {setViewingIngredient} = viewingIngredientSlice.actions; 