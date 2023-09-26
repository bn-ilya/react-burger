import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewingIngredient: {},
};

const viewingIngredientSlice = createSlice({
  name: 'viewingIngredient',
  initialState,
  reducers: {
    setViewingIngredient: (state, action) => {
      state.viewingIngredient = action.payload;
    },
    clearViewingIngredient: (state) => {
      state.viewingIngredient = initialState.viewingIngredient;
    },
  },
});

export default viewingIngredientSlice.reducer;
export const { setViewingIngredient, clearViewingIngredient } = viewingIngredientSlice.actions;
