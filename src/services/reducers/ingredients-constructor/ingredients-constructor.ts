import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import { IIngredient, IIngredientConstructor, SliceActions } from '../../../utils/types';

export interface IInitialState {
  ingredients: Array<IIngredientConstructor>;
  bunTop: IIngredient | null;
  bunBottom: IIngredient | null;
}

const initialState: IInitialState = {
  ingredients: [],
  bunTop: null,
  bunBottom: null,
};

const ingredientsConstructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
  reducers: {
    setBunTop: (state, action: PayloadAction<IIngredient>) => {
      state.bunTop = action.payload;
    },
    setBunBottom: (state, action: PayloadAction<IIngredient>) => {
      state.bunBottom = action.payload;
    },
    addIngredients: {
      reducer: (state, action: PayloadAction<IIngredientConstructor>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: IIngredient) => {
        const uniqueId = nanoid();
        return { payload: { ...ingredient, uniqueId } };
      },
    },
    removeIngredient: (state, action: PayloadAction<IIngredientConstructor['uniqueId']>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.uniqueId !== action.payload,
      );
    },
    updateIndexIngredients: (state) => {
      state.ingredients = state.ingredients.map((ingredient, index) => ({
        ...ingredient,
        index: index,
      }));
    },
    moveIngredients: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const ingredient = state.ingredients[action.payload.dragIndex];
      state.ingredients.splice(action.payload.dragIndex, 1);
      state.ingredients.splice(action.payload.hoverIndex, 0, { ...ingredient });
    },
  },
});

export default ingredientsConstructorSlice.reducer;
export const {
  setBunTop,
  setBunBottom,
  addIngredients,
  removeIngredient,
  updateIndexIngredients,
  moveIngredients,
} = ingredientsConstructorSlice.actions;
export type TIngredientsConstructorSliceActions = SliceActions<
  typeof ingredientsConstructorSlice.actions
>;
