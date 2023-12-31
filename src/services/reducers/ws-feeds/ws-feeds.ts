import { createAction, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IFeedByNumberResponse, type IFeedsAllResponse } from './types';

import { AppDispatch } from '..';
import { getFeedByNumber as getFeedByNumberApi } from '../../../utils/burger-api';
import { IOrder, IError, IWsActions, SliceActions } from '../../../utils/types';

interface IInitialState {
  wsConnected: boolean;
  feeds: Array<IOrder>;
  total: number;
  totalToday: number;
  feedRequest: boolean;
  feedFailed: boolean;

  error?: Event;
}

export const initialState: IInitialState = {
  wsConnected: false,
  feeds: [],
  total: 0,
  totalToday: 0,
  feedRequest: false,
  feedFailed: false,
};

const nameSlice = 'wsFeeds';

export const getFeedByNumber = createAsyncThunk<
  IOrder,
  IOrder['number'],
  { rejectValue: IError; dispatch: AppDispatch }
>(`${nameSlice}/getFeedByNumber`, async function (number, { rejectWithValue, dispatch }) {
  try {
    const res = await getFeedByNumberApi<IFeedByNumberResponse>(number);
    const feed = res.orders[0];
    dispatch(setFeed(feed));
    return feed;
  } catch (error) {
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});
const wsFeedsSlice = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    setFeed: (store, action: PayloadAction<IOrder>) => {
      store.feeds = [...store.feeds, action.payload];
    },
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
    wsGetFeeds: (store, action: PayloadAction<IFeedsAllResponse>) => {
      store.feeds = action.payload.orders;
      store.total = action.payload.total;
      store.totalToday = action.payload.totalToday;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedByNumber.pending, (state) => {
        state.feedRequest = true;
      })
      .addCase(getFeedByNumber.fulfilled, (state) => {
        state.feedRequest = false;
        state.feedFailed = false;
      })
      .addCase(getFeedByNumber.rejected, (state) => {
        state.feedRequest = false;
        state.feedFailed = true;
      });
  },
});
export const wsInit = createAction(`${nameSlice}/wsInit`);
export const wsSend = createAction(`${nameSlice}/wsSend`);
export const wsClose = createAction(`${nameSlice}/wsClose`);

export default wsFeedsSlice.reducer;

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetFeeds, setFeed } =
  wsFeedsSlice.actions;

export const wsActionsFeeds: IWsActions = {
  init: wsInit,
  send: wsSend,
  close: wsClose,
  onsuccess: wsConnectionSuccess,
  onerror: wsConnectionError,
  onclose: wsConnectionClosed,
  onmessage: wsGetFeeds,
};

export type TWsFeedSliceActions = SliceActions<typeof wsFeedsSlice.actions>;
