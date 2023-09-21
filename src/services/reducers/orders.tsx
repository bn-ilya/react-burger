import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder as createOrderApi } from '../../utils/burger-api';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async function (ids: Array<number>, { rejectWithValue, dispatch }) {
    try {
      const res: any = await createOrderApi(ids);
      dispatch(addOrder(res));
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: any = {
  orders: [],
  orderRequest: false,
  orderFailed: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: any) => {
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
