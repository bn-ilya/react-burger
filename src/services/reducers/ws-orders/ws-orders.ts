import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IOrdersAllResponse } from './types';

import { IOrder, IWsActions, SliceActions } from '../../../utils/types';

const nameSlice = 'wsOrder';

interface IInitialState {
  wsConnected: boolean;
  orders: Array<IOrder>;
  error?: Event;
}

export const initialState: IInitialState = {
  wsConnected: false,
  orders: [],
};

const wsOrdersSlice = createSlice({
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
    wsGetOrders: (store, action: PayloadAction<IOrdersAllResponse>) => {
      store.orders = action.payload.orders.reverse();
    },
  },
});

export const wsInit = createAction(`${nameSlice}/wsInit`);
export const wsSend = createAction(`${nameSlice}/wsSend`);
export const wsClose = createAction(`${nameSlice}/wsClose`);

export default wsOrdersSlice.reducer;

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetOrders } =
  wsOrdersSlice.actions;

export const wsActionsOrders: IWsActions = {
  init: wsInit,
  send: wsSend,
  close: wsClose,
  onsuccess: wsConnectionSuccess,
  onerror: wsConnectionError,
  onclose: wsConnectionClosed,
  onmessage: wsGetOrders,
};

export type TWsOrdersSliceActions = SliceActions<typeof wsOrdersSlice.actions>;
