import resetPasswordReducer, { resetPassword, IInitialState } from './reset-password';

describe('resetPassword reducer', () => {
  const initialState: IInitialState = {
    resetPasswordRequest: false,
    resetPasswordFailed: false,
  };

  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(resetPasswordReducer(initialState, action)).toEqual(initialState);
  });

  it('should change status with "resetPassword.pending" action', () => {
    const action = { type: resetPassword.pending.type };
    const state = resetPasswordReducer(initialState, action);

    expect(state).toEqual({ ...initialState, resetPasswordRequest: true });
  });

  it('should change status with "resetPassword.fulfilled" action', () => {
    const action = { type: resetPassword.fulfilled.type };
    const state = resetPasswordReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: false,
    });
  });

  it('should change status with "resetPassword.rejected" action', () => {
    const action = { type: resetPassword.rejected.type };
    const state = resetPasswordReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordFailed: true,
    });
  });
});
