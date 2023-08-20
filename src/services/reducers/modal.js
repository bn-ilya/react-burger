import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false,
    contentModal: null,
    typeModal: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.contentModal = action.payload.content;
            state.typeModal = action.payload.type;
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.contentModal = initialState.contentModal;
            state.typeModal = initialState.typeModal
            state.isModalOpen = false;
        }
    }
})

export default modalSlice.reducer;
export const { openModal, closeModal} = modalSlice.actions; 