import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    contentModal: null,
    typeModal: null,
    goBack: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.contentModal = action.payload.content;
            state.typeModal = action.payload.type;
            state.isModalOpen = true;
            state.goBack = action.payload?.goBack || null;
        },
        closeModal: (state) => {
            state.contentModal = initialState.contentModal;
            state.typeModal = initialState.typeModal;
            state.isModalOpen = false;
            state.goBack = initialState.goBack;
        }
    }
})

export default modalSlice.reducer;
export const { openModal, closeModal} = modalSlice.actions; 