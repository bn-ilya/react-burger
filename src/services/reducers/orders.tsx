import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { createOrder as createOrderApi } from '../../utils/burger-api';

interface IOrder {
  name: string;
  order: {
    number: number;
  };
}

interface ICreateOrderRespone extends IOrder {
  success: boolean;
}

interface IInitialState {
  orders: Array<IOrder>;
  orderRequest: boolean;
  orderFailed: boolean;
}

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async function (ids: Array<string>, { rejectWithValue, dispatch }) {
    try {
      const res = await createOrderApi<ICreateOrderRespone>(ids);
      const order: IOrder = { name: res.name, order: res.order };
      dispatch(addOrder(order));
      return order;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: IInitialState = {
  orders: [],
  orderRequest: false,
  orderFailed: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
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
