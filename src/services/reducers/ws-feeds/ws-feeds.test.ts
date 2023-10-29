import { IFeedsAllResponse } from './types';
import wsFeedsReducer, {
  getFeedByNumber,
  initialState,
  setFeed,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetFeeds,
} from './ws-feeds';

import { mockOrder } from '../../mocks/order.mock';

describe('WsFeeds reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(wsFeedsReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setFeed', () => {
    const action = setFeed(mockOrder);
    const expectedState = { ...initialState, feeds: [...initialState.feeds, mockOrder] };
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
      orders: [mockOrder, mockOrder, mockOrder],
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
