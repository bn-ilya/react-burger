import modalReducer, { closeModal, openModal, initialState } from './modal';

import { ETypesModal } from '../../../utils/types';

describe('modal reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(modalReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle openModal', () => {
    const mockModal = {
      isModalOpen: true,
      contentModal: 'test',
      typeModal: ETypesModal.ORDER,
      goBack: true,
    };

    const expectedState = mockModal;
    const action = openModal(mockModal);
    expect(modalReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle closeModal', () => {
    const expectedState = initialState;
    const action = closeModal();
    expect(modalReducer(initialState, action)).toEqual(expectedState);
  });
});
