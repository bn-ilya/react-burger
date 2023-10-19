import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IOrderWithOwner, IWsActions, SliceActions } from '../../../utils/types';

const nameSlice = 'wsOrder';

interface IInitalState {
  wsConnected: boolean;
  orders: Array<IOrderWithOwner>;
  error?: Event;
}

const initialState: IInitalState = {
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
    wsGetOrders: (store, action: PayloadAction<any>) => {
      store.orders = action.payload.orders;
    },
  },
});

export const wsInit = createAction(`${nameSlice}/wsInit`);
export const wsSend = createAction(`${nameSlice}/wsSend`);

export default wsOrdersSlice.reducer;

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetOrders } =
  wsOrdersSlice.actions;

export const wsActionsOrders: IWsActions = {
  init: wsInit,
  send: wsSend,
  onsuccess: wsConnectionSuccess,
  onerror: wsConnectionError,
  onclose: wsConnectionClosed,
  onmessage: wsGetOrders,
};

export type TWsOrdersSliceActions = SliceActions<typeof wsOrdersSlice.actions>;
