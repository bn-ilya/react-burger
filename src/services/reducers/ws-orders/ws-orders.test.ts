import { IOrdersAllResponse } from './types';
import wsOrdersReducer, {
  initialState,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetOrders,
} from './ws-orders';

import { mockOrder } from '../../mocks/order.mock';

describe('WsFeeds reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(wsOrdersReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle wsConnectionSuccess', () => {
    const action = wsConnectionSuccess();
    const expectedState = { ...initialState, error: undefined, wsConnected: true };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle wsConnectionError', () => {
    const event = new Event('test');
    const action = wsConnectionError(event);
    const expectedState = { ...initialState, error: event, wsConnected: false };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle wsConnectionClosed', () => {
    const action = wsConnectionClosed();
    const expectedState = { ...initialState, error: undefined, wsConnected: false };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle wsGetOrders', () => {
    const mockResponse: IOrdersAllResponse = {
      success: true,
      orders: [mockOrder, mockOrder, mockOrder, mockOrder],
      total: 24155,
      totalToday: 34,
    };

    const action = wsGetOrders(mockResponse);
    const expectedState = {
      ...initialState,
      orders: mockResponse.orders.reverse(),
    };
    expect(wsOrdersReducer(initialState, action)).toEqual(expectedState);
  });
});
