import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IIngredient } from '../../utils/types';

interface IInitialSTate {
  viewingIngredient: IIngredient | null;
}

const initialState: IInitialSTate = {
  viewingIngredient: null,
};

const viewingIngredientSlice = createSlice({
  name: 'viewingIngredient',
  initialState,
  reducers: {
    setViewingIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.viewingIngredient = action.payload;
    },
    clearViewingIngredient: (state) => {
      state.viewingIngredient = initialState.viewingIngredient;
    },
  },
});

export default viewingIngredientSlice.reducer;
export const { setViewingIngredient, clearViewingIngredient } = viewingIngredientSlice.actions;
