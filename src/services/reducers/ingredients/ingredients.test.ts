import ingredientsReducer, {
  getIngredients,
  setCountBuns,
  setCountIngredients,
  setIngredients,
  initialState,
} from './ingredients';

import { IIngredient } from '../../../utils/types';
import { mockIngredient } from '../../mocks/ingredient.mock';

describe('ingredients reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(ingredientsReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setIngredients', () => {
    const mockArrayIngredients: Array<IIngredient> = [
      { ...mockIngredient, type: 'bun' },
      { ...mockIngredient, type: 'sauce' },
      { ...mockIngredient, type: 'main' },
    ];

    const action = setIngredients(mockArrayIngredients);
    const expectedState = {
      ...initialState,
      buns: [mockArrayIngredients[0]],
      sauces: [mockArrayIngredients[1]],
      mains: [mockArrayIngredients[2]],
    };
    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setCountIngredients', () => {
    const state: typeof initialState = {
      ...initialState,
      mains: [{ ...mockIngredient, _id: '343d69a5c3f7b9001cfa093c', type: 'main' }],
      sauces: [{ ...mockIngredient, type: 'sauce' }],
    };

    const expectedState = {
      ...state,
      mains: [{ ...state.mains[0], count: 2 }],
      sauces: [{ ...state.sauces[0], count: undefined }],
    };
    const action = setCountIngredients({ '343d69a5c3f7b9001cfa093c': 2 });

    expect(ingredientsReducer(state, action)).toEqual(expectedState);
  });

  it('should handle setCountBuns', () => {
    const state: typeof initialState = {
      ...initialState,
      buns: [{ ...mockIngredient, _id: '143d69a5c3f7b9001cfa093c', type: 'bun' }],
    };

    const expectedState = {
      ...state,
      buns: [{ ...state.buns[0], count: 2 }],
    };
    const action = setCountBuns({ '143d69a5c3f7b9001cfa093c': 2 });

    expect(ingredientsReducer(state, action)).toEqual(expectedState);
  });

  it('should change status with "getIngredients.pending" action', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, ingredientsRequest: true });
  });

  it('should change status with "getIngredients.fulfilled" action', () => {
    const action = { type: getIngredients.fulfilled.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, ingredientsRequest: false, ingredientsFailed: false });
  });

  it('should change status with "getIngredients.rejected" action', () => {
    const action = { type: getIngredients.rejected.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, ingredientsRequest: false, ingredientsFailed: true });
  });
});
