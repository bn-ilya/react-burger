import { mockIngredient, mockIngredientConstructor } from './../../mocks/ingredient.mock';
import ingredientsConstructorReducer, {
  addIngredients,
  moveIngredients,
  removeIngredient,
  setBunBottom,
  setBunTop,
  updateIndexIngredients,
  type IInitialState,
} from './ingredients-constructor';

import { IIngredientConstructor } from '../../../utils/types';

describe('ingredientsConstructor reducer', () => {
  const initialState: IInitialState = {
    ingredients: [],
    bunTop: null,
    bunBottom: null,
  };

  it('should handle initialState', () => {
    const action = { type: 'unknown' };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setBunTop', () => {
    const action = setBunTop(mockIngredient);
    const expectedState = { ...initialState, bunTop: mockIngredient };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setBunBottom', () => {
    const action = setBunBottom(mockIngredient);
    const expectedState = { ...initialState, bunBottom: mockIngredient };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle addIngredients', () => {
    const action = addIngredients(mockIngredient);

    const expectedState = {
      ...initialState,
      ingredients: [
        ...initialState.ingredients,
        { ...mockIngredient, uniqueId: expect.any(String) },
      ],
    };

    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle removeIngredient', () => {
    const mockIngredientUniqueId: IIngredientConstructor['uniqueId'] = '643d69a5c3f7b9001cfa093c';

    const state: IInitialState = {
      ingredients: [
        {
          ...mockIngredientConstructor,
          uniqueId: mockIngredientUniqueId,
        },
      ],
      bunTop: null,
      bunBottom: null,
    };

    const expectedStateIngredients = state.ingredients.filter(
      (ingredient) => ingredient.uniqueId !== mockIngredientUniqueId,
    );
    const action = removeIngredient(mockIngredientUniqueId);
    const expectedState = { ...initialState, ingredients: expectedStateIngredients };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle updateIndexIngredients', () => {
    const state: IInitialState = {
      ingredients: [
        { ...mockIngredientConstructor, index: 1 },
        { ...mockIngredientConstructor, index: 3 },
      ],
      bunTop: null,
      bunBottom: null,
    };

    const action = updateIndexIngredients();
    const expectedState = {
      ...state,
      ingredients: [
        { ...state.ingredients[0], index: 0 },
        { ...state.ingredients[1], index: 1 },
      ],
    };
    expect(ingredientsConstructorReducer(state, action)).toEqual(expectedState);
  });

  it('should handle moveIngredients', () => {
    const state: IInitialState = {
      ingredients: [mockIngredientConstructor, mockIngredientConstructor],
      bunTop: null,
      bunBottom: null,
    };

    const action = moveIngredients({ dragIndex: 0, hoverIndex: 1 });
    const expectedState = {
      ...state,
      ingredients: [state.ingredients[1], state.ingredients[0]],
    };
    expect(ingredientsConstructorReducer(state, action)).toEqual(expectedState);
  });
});
