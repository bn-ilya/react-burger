import OrderReducer, { addOrder, initialState, createOrder } from './orders';

import { mockOrderWithOwner } from '../../mocks/order-with-owner.mock ';

describe('Order reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    const expectedState = initialState;

    expect(OrderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle addOrder', () => {
    const action = addOrder(mockOrderWithOwner);
    const expectedState = { ...initialState, orders: [...initialState.orders, mockOrderWithOwner] };

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
