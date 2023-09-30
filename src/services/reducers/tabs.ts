import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { EIngredients } from '../../utils/types';

interface IInitialState {
  activeTab: EIngredients;
}

const initialState: IInitialState = {
  activeTab: EIngredients.BUN,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<EIngredients>) => {
      state.activeTab = action.payload;
    },
  },
});

export default tabsSlice.reducer;
export const { setActiveTab } = tabsSlice.actions;
