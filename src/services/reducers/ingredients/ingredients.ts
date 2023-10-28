import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from '..';

import { getIngredients as getIngredientsApi } from '../../../utils/burger-api';
import { IError, IIngredient, IIngredientsCount, SliceActions } from '../../../utils/types';

interface IGetIngredientsResponse {
  data: Array<IIngredient>;
  success: boolean;
}

interface IInitialState {
  buns: Array<IIngredient>;
  sauces: Array<IIngredient>;
  mains: Array<IIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export const getIngredients = createAsyncThunk<
  IGetIngredientsResponse,
  undefined,
  { rejectValue: IError; dispatch: AppDispatch }
>('ingredients/getIngredients', async function (_, { rejectWithValue, dispatch }) {
  try {
    const res = await getIngredientsApi<IGetIngredientsResponse>();
    dispatch(setIngredients(res.data));
    return res;
  } catch (error) {
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

const initialState: IInitialState = {
  buns: [],
  sauces: [],
  mains: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Array<IIngredient>>) => {
      state.buns = action.payload.filter((ingredient) => ingredient.type === 'bun');
      state.sauces = action.payload.filter((ingredient) => ingredient.type === 'sauce');
      state.mains = action.payload.filter((ingredient) => ingredient.type === 'main');
    },
    setCountIngredients: (state, action: PayloadAction<IIngredientsCount>) => {
      state.sauces = state.sauces.map((sauce) =>
        action.payload[sauce['_id']]
          ? { ...sauce, count: action.payload[sauce['_id']] }
          : { ...sauce, count: undefined },
      );
      state.mains = state.mains.map((main) =>
        action.payload[main['_id']]
          ? { ...main, count: action.payload[main['_id']] }
          : { ...main, count: undefined },
      );
    },
    setCountBuns: (state, action: PayloadAction<IIngredientsCount>) => {
      state.buns = state.buns.map((bun) =>
        action.payload[bun['_id']]
          ? { ...bun, count: action.payload[bun['_id']] }
          : { ...bun, count: undefined },
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequest = true;
      })
      .addCase(getIngredients.fulfilled, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      });
  },
});

export default ingredientsSlice.reducer;
export const { setIngredients, setCountIngredients, setCountBuns } = ingredientsSlice.actions;
export type TIngredientsSliceActions = SliceActions<typeof ingredientsSlice.actions>;
