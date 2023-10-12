import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Order, type ResponseFeedsAll } from './types';

import { IWsActions, SliceActions } from '../../../utils/types';

interface IInitialState {
  wsConnected: boolean;
  feeds: Array<Order>;
  total: number;
  totalToday: number;

  error?: Event;
}

const initialState: IInitialState = {
  wsConnected: false,
  feeds: [],
  total: 0,
  totalToday: 0,
};

const nameSlice = 'wsFeeds';
const wsFeedsSlice = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    wsConnectionSuccess: (store) => {
      store.error = undefined;
      store.wsConnected = true;
    },
    wsConnectionError: (store, action: PayloadAction<Event>) => {
      store.error = action.payload;
      store.wsConnected = false;
    },
    wsConnectionClosed: (store) => {
      store.error = undefined;
      store.wsConnected = false;
    },
    wsGetFeeds: (store, action: PayloadAction<ResponseFeedsAll>) => {
      store.feeds = [...store.feeds, ...action.payload.orders];
      store.total = action.payload.total;
      store.totalToday = action.payload.totalToday;
    },
  },
});
export const wsInit = createAction(`${nameSlice}/wsInit`);
export const wsSend = createAction(`${nameSlice}/wsSend`);

export default wsFeedsSlice.reducer;

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetFeeds } =
  wsFeedsSlice.actions;

export const wsActionsFeeds: IWsActions = {
  init: wsInit,
  send: wsSend,
  onsuccess: wsConnectionSuccess,
  onerror: wsConnectionError,
  onclose: wsConnectionClosed,
  onmessage: wsGetFeeds,
};

export type TWsFeedSliceActions = SliceActions<typeof wsFeedsSlice.actions>;
