import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IWsActions, SliceActions } from '../../utils/types';

interface IInitialState {
  wsConnected: boolean;
  feeds: Array<any>;

  error?: Event;
}

const initialState: IInitialState = {
  wsConnected: false,
  feeds: [],
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
    // TODO: Должна быть сигнатура data
    wsGetFeeds: (store, action: PayloadAction<any>) => {
      console.log(wsGetFeeds);
      store.feeds.push(action.payload);
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
