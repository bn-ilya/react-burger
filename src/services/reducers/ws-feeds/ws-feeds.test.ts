import { IFeedsAllResponse } from './types';
import wsFeedsReducer, {
  getFeedByNumber,
  IInitialState,
  setFeed,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetFeeds,
} from './ws-feeds';

import { IOrder } from '../../../utils/types';

const initialState: IInitialState = {
  wsConnected: false,
  feeds: [],
  total: 0,
  totalToday: 0,
  feedRequest: false,
  feedFailed: false,
};

describe('WsFeeds reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(wsFeedsReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setFeed', () => {
    const mockFeed: IOrder = {
      _id: '653c1da752b4cf001d86e0c0',
      ingredients: [
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093d',
      ],
      owner: '6537d2eb52b4cf001d86d031',
      status: 'done',
      name: 'Space антарианский флюоресцентный spicy бургер',
      createdAt: '2023-10-27T20:29:27.735Z',
      updatedAt: '2023-10-27T20:29:27.967Z',
      number: 24526,
      __v: 0,
    };

    const action = setFeed(mockFeed);
    const expectedState = { ...initialState, feeds: [...initialState.feeds, mockFeed] };
    expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle wsConnectionSuccess', () => {
    const action = wsConnectionSuccess();
    const expectedState = { ...initialState, error: undefined, wsConnected: true };
    expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle wsConnectionError', () => {
    const event = new Event('test');
    const action = wsConnectionError(event);
    const expectedState = { ...initialState, error: event, wsConnected: false };
    expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle wsConnectionClosed', () => {
    const action = wsConnectionClosed();
    const expectedState = { ...initialState, error: undefined, wsConnected: false };
    expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle wsGetFeeds', () => {
    const mockResponse: IFeedsAllResponse = {
      success: true,
      orders: [
        {
          _id: '653c235752b4cf001d86e0dc',
          ingredients: [
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
          ],
          status: 'done',
          name: 'Space антарианский флюоресцентный spicy бургер',
          createdAt: '2023-10-27T20:53:43.116Z',
          updatedAt: '2023-10-27T20:53:43.369Z',
          number: 24528,
        },
        {
          _id: '653c209852b4cf001d86e0cf',
          ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2023-10-27T20:42:00.011Z',
          updatedAt: '2023-10-27T20:42:00.286Z',
          number: 24527,
        },
        {
          _id: '653c1da752b4cf001d86e0c0',
          ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa093d',
          ],
          status: 'done',
          name: 'Space антарианский флюоресцентный spicy бургер',
          createdAt: '2023-10-27T20:29:27.735Z',
          updatedAt: '2023-10-27T20:29:27.967Z',
          number: 24526,
        },
        {
          _id: '653c1c6452b4cf001d86e0bd',
          ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2023-10-27T20:24:04.392Z',
          updatedAt: '2023-10-27T20:24:04.654Z',
          number: 24525,
        },
      ],
      total: 24154,
      totalToday: 33,
    };

    const action = wsGetFeeds(mockResponse);
    const expectedState = {
      ...initialState,
      feeds: [...initialState.feeds, ...mockResponse.orders],
      total: mockResponse.total,
      totalToday: mockResponse.totalToday,
    };
    expect(wsFeedsReducer(initialState, action)).toEqual(expectedState);
  });

  it('should change status with "getFeedByNumber.pending" action', () => {
    const action = { type: getFeedByNumber.pending.type };
    const state = wsFeedsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, feedRequest: true });
  });

  it('should change status with "getFeedByNumber.fulfilled" action', () => {
    const action = { type: getFeedByNumber.fulfilled.type };
    const state = wsFeedsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, feedRequest: false, feedFailed: false });
  });

  it('should change status with "getFeedByNumber.rejected" action', () => {
    const action = { type: getFeedByNumber.rejected.type };
    const state = wsFeedsReducer(initialState, action);

    expect(state).toEqual({ ...initialState, feedRequest: false, feedFailed: true });
  });
});
