import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ReactElement } from 'react';

import { IOrder, ETypesModal, IIngredient, SliceActions } from '../../../utils/types';

export interface IInitialState {
  isModalOpen?: boolean;
  contentModal: ReactElement | IIngredient | IOrder | string | number | null;
  typeModal: ETypesModal | null;
  goBack?: boolean | null;
}

const initialState: IInitialState = {
  isModalOpen: false,
  contentModal: null,
  typeModal: null,
  goBack: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IInitialState>) => {
      state.contentModal = action.payload.contentModal;
      state.typeModal = action.payload.typeModal;
      state.isModalOpen = true;
      state.goBack = action.payload?.goBack || null;
    },
    closeModal: (state) => {
      state.contentModal = initialState.contentModal;
      state.typeModal = initialState.typeModal;
      state.isModalOpen = false;
      state.goBack = initialState.goBack;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
export type TModalSliceActions = SliceActions<typeof modalSlice.actions>;
