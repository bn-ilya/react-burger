import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import { IIngredient } from '../../utils/types';

interface IIngredientConstructor extends IIngredient {
  uniqueId: string;
  index?: number;
}

interface IInitialState {
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
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setBunTop: (state, action) => {
      state.bunTop = action.payload;
    },
    setBunBottom: (state, action) => {
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
    removeIngredient: (state, action) => {
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
    sortedIngredients: (state) => {
      state.ingredients.sort((a, b) => {
        if (!a.index || !b.index) return 0;
        return a.index - b.index;
      });
    },
    moveIngredients: (state, action) => {
      state.ingredients.splice(action.payload.dragIndex, 1);
      state.ingredients.splice(action.payload.hoverIndex, 0, action.payload.ingredient);
    },
  },
});

export default ingredientsConstructorSlice.reducer;
export const {
  setIngredients,
  setBunTop,
  setBunBottom,
  addIngredients,
  removeIngredient,
  updateIndexIngredients,
  moveIngredients,
  sortedIngredients,
} = ingredientsConstructorSlice.actions;
