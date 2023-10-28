import viewingIngredientReducer, {
  clearViewingIngredient,
  IInitialState,
  setViewingIngredient,
} from './viewing-ingredient';

import { IIngredient } from '../../../utils/types';

describe('viewingIngredient reducer', () => {
  const initialState: IInitialState = {
    viewingIngredient: null,
  };

  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(viewingIngredientReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setViewingIngredient', () => {
    const mockIngredient: IIngredient = {
      _id: '143d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    };

    const action = setViewingIngredient(mockIngredient);
    const expectedState = { ...initialState, viewingIngredient: mockIngredient };
    expect(viewingIngredientReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setViewingIngredient', () => {
    const state: IInitialState = {
      viewingIngredient: {
        _id: '143d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      },
    };

    const action = clearViewingIngredient();
    const expectedState = { ...initialState, viewingIngredient: initialState.viewingIngredient };
    expect(viewingIngredientReducer(state, action)).toEqual(expectedState);
  });
});
