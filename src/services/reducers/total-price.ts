import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  totalPrice: number;
}

const initialState: IInitialState = {
  totalPrice: 0,
};

const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState: initialState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
  },
});

export default totalPriceSlice.reducer;
export const { setTotalPrice } = totalPriceSlice.actions;