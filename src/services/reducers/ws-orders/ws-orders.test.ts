import { IOrdersAllResponse } from './types';
import wsOrdersReducer, {
  initialState,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetOrders,
} from './ws-orders';

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
      orders: [
        {
          _id: '652ad11552b4cf001d86a423',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0943',
          ],
          status: 'done',
          name: 'Space краторный бургер',
          createdAt: '2023-10-14T17:34:13.928Z',
          updatedAt: '2023-10-14T17:34:14.174Z',
          number: 23290,
        },
        {
          _id: '652ad1bc52b4cf001d86a42a',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2023-10-14T17:37:00.433Z',
          updatedAt: '2023-10-14T17:37:00.747Z',
          number: 23293,
        },
        {
          _id: '652ad26152b4cf001d86a42b',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2023-10-14T17:39:45.373Z',
          updatedAt: '2023-10-14T17:39:45.581Z',
          number: 23294,
        },
        {
          _id: '652ad2a352b4cf001d86a42e',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0942',
          ],
          status: 'done',
          name: 'Флюоресцентный spicy бургер',
          createdAt: '2023-10-14T17:40:51.896Z',
          updatedAt: '2023-10-14T17:40:52.108Z',
          number: 23295,
        },
      ],
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
