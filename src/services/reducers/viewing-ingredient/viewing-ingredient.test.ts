import viewingIngredientReducer, {
  clearViewingIngredient,
  initialState,
  setViewingIngredient,
} from './viewing-ingredient';

import { mockIngredient } from '../../mocks/ingredient.mock';

describe('viewingIngredient reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(viewingIngredientReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setViewingIngredient', () => {
    const action = setViewingIngredient(mockIngredient);
    const expectedState = { ...initialState, viewingIngredient: mockIngredient };
    expect(viewingIngredientReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle clearViewingIngredient', () => {
    const state: typeof initialState = {
      viewingIngredient: mockIngredient,
    };

    const action = clearViewingIngredient();
    const expectedState = { ...initialState, viewingIngredient: initialState.viewingIngredient };
    expect(viewingIngredientReducer(state, action)).toEqual(expectedState);
  });
});
