import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'bun',
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export default tabsSlice.reducer;
export const { setActiveTab } = tabsSlice.actions;
