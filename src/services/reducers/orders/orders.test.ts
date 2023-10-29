import OrderReducer, { addOrder, initialState, createOrder } from './orders';

import { IOrderWithOwner } from '../../../utils/types';

describe('Order reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    const expectedState = initialState;

    expect(OrderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle addOrder', () => {
    const mockOrder: IOrderWithOwner = {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
        },
        {
          _id: '643d69a5c3f7b9001cfa0943',
          name: 'Соус фирменный Space Sauce',
          type: 'sauce',
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
          __v: 0,
        },
      ],
      _id: '653aa45552b4cf001d86dadc',
      owner: {
        name: 'cы',
        email: 'bn.ilyaa@yandex.rus',
        createdAt: '2023-10-06T21:48:42.247Z',
        updatedAt: '2023-10-19T19:00:08.804Z',
      },
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2023-10-26T17:39:33.788Z',
      updatedAt: '2023-10-26T17:39:34.655Z',
      number: 24490,
      price: 2056,
    };

    const action = addOrder(mockOrder);
    const expectedState = { ...initialState, orders: [...initialState.orders, mockOrder] };

    expect(OrderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should change status with "createOrder.pending" action', () => {
    const action = { type: createOrder.pending.type };
    const state = OrderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, orderRequest: true });
  });

  it('should change status with "createOrder.fulfilled" action', () => {
    const action = { type: createOrder.fulfilled.type };
    const state = OrderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, orderRequest: false, orderFailed: false });
  });

  it('should change status with "createOrder.rejected" action', () => {
    const action = { type: createOrder.rejected.type };
    const state = OrderReducer(initialState, action);

    expect(state).toEqual({ ...initialState, orderRequest: false, orderFailed: true });
  });
});
