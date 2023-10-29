import ingredientsConstructorReducer, {
  addIngredients,
  moveIngredients,
  removeIngredient,
  setBunBottom,
  setBunTop,
  updateIndexIngredients,
  initialState,
} from './ingredients-constructor';

import { IIngredient, IIngredientConstructor } from '../../../utils/types';

describe('ingredientsConstructor reducer', () => {
  it('should handle initialState', () => {
    const action = { type: 'unknown' };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setBunTop', () => {
    const mockIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
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

    const action = setBunTop(mockIngredient);
    const expectedState = { ...initialState, bunTop: mockIngredient };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setBunBottom', () => {
    const mockIngredient: IIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
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

    const action = setBunBottom(mockIngredient);
    const expectedState = { ...initialState, bunBottom: mockIngredient };
    expect(ingredientsConstructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle addIngredients', () => {
    const mockIngredient: IIngredient = {
      _id: '643d69a5c3f7b9001cfa093c',
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

    const state = {
      ...initialState,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
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
          uniqueId: mockIngredientUniqueId,
        },
      ],
    };

    const expectedStateIngredients = state.ingredients.filter(
      (ingredient) => ingredient.uniqueId !== mockIngredientUniqueId,
    );
    const action = removeIngredient(mockIngredientUniqueId);
    const expectedState = { ...state, ingredients: expectedStateIngredients };
    expect(ingredientsConstructorReducer(state, action)).toEqual(expectedState);
  });

  it('should handle updateIndexIngredients', () => {
    const state = {
      ...initialState,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
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
          uniqueId: '643d69a5c3f7b9001cfa093c',
          index: 1,
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
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
          uniqueId: '643d69a5c3f7b9001cfa093c',
          index: 3,
        },
      ],
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
    const state = {
      ...initialState,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
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
          uniqueId: '643d69a5c3f7b9001cfa093c',
          index: 1,
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
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
          uniqueId: '643d69a5c3f7b9001cfa093c',
          index: 3,
        },
      ],
    };
    const action = moveIngredients({ dragIndex: 0, hoverIndex: 1 });
    const expectedState = {
      ...state,
      ingredients: [state.ingredients[1], state.ingredients[0]],
    };
    expect(ingredientsConstructorReducer(state, action)).toEqual(expectedState);
  });
});
