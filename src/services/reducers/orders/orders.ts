import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch } from '..';

import { createOrder as createOrderApi } from '../../../utils/burger-api';
import { IError, IOrderWithOwner, SliceActions, TIdIngredient } from '../../../utils/types';

interface ICreateOrderRespone {
  success: boolean;
  order: IOrderWithOwner;
}

interface IInitialState {
  orders: Array<IOrderWithOwner>;
  orderRequest: boolean;
  orderFailed: boolean;
}

export const createOrder = createAsyncThunk<
  IOrderWithOwner,
  Array<TIdIngredient>,
  { rejectValue: IError; dispatch: AppDispatch }
>('orders/createOrder', async function (ids, { rejectWithValue, dispatch }) {
  try {
    const res = await createOrderApi<ICreateOrderRespone>(ids);
    const order: IOrderWithOwner = res.order;
    dispatch(addOrder(order));
    return order;
  } catch (error) {
    const errorObject = error as IError;
    return rejectWithValue(errorObject);
  }
});

const initialState: IInitialState = {
  orders: [],
  orderRequest: false,
  orderFailed: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrderWithOwner>) => {
      state.orders.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.orderRequest = false;
        state.orderFailed = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  },
});

export default ordersSlice.reducer;
export const { addOrder } = ordersSlice.actions;
export type TOrdersSliceActions = SliceActions<typeof ordersSlice.actions>;
