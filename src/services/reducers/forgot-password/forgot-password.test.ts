import forgotPasswordReducer, {
  forgotPassword,
  initialState,
  setForgotPassword,
} from './forgot-password';

describe('ForgotPassword reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(forgotPasswordReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setForgotPassword true', () => {
    const mockResponse = true;
    const action = setForgotPassword(mockResponse);
    expect(forgotPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      forgotPassword: mockResponse,
    });
  });

  it('should handle setForgotPassword false', () => {
    const mockResponse = false;
    const action = setForgotPassword(mockResponse);
    expect(forgotPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      forgotPassword: mockResponse,
    });
  });

  it('should change status with "createOrder.pending" action', () => {
    const action = { type: forgotPassword.pending.type };
    const state = forgotPasswordReducer(initialState, action);

    expect(state).toEqual({ ...initialState, forgotPasswordRequest: true });
  });

  it('should change status with "createOrder.fulfilled" action', () => {
    const action = { type: forgotPassword.fulfilled.type };
    const state = forgotPasswordReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordFailed: false,
    });
  });

  it('should change status with "createOrder.rejected" action', () => {
    const action = { type: forgotPassword.rejected.type };
    const state = forgotPasswordReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordFailed: true,
    });
  });
});
