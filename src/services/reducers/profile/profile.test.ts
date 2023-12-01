import profileReducer, {
  getUserData,
  initialState,
  login,
  logout,
  register,
  setEmail,
  setName,
  updateUserData,
} from './profile';

describe('profile reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(profileReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setName', () => {
    const mockName = 'Иван';
    const action = setName(mockName);
    const expectedState = { ...initialState, name: mockName };
    expect(profileReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle setEmail', () => {
    const mockEmail = 'example@example.ru';
    const action = setEmail(mockEmail);
    const expectedState = { ...initialState, email: mockEmail };
    expect(profileReducer(initialState, action)).toEqual(expectedState);
  });

  it('should change status with "register.pending" action', () => {
    const action = { type: register.pending.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({ ...initialState, getUserDataRequest: true });
  });

  it('should change status with "register.fulfilled" action', () => {
    const action = { type: register.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      getUserDataRequest: false,
      getUserDataFailed: false,
    });
  });

  it('should change status with "register.rejected" action', () => {
    const action = { type: register.rejected.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      getUserDataRequest: false,
      getUserDataFailed: true,
    });
  });

  it('should change status with "login.pending" action', () => {
    const action = { type: login.pending.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({ ...initialState, getUserDataRequest: true });
  });

  it('should change status with "login.fulfilled" action', () => {
    const action = { type: login.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      getUserDataRequest: false,
      getUserDataFailed: false,
    });
  });

  it('should change status with "login.rejected" action', () => {
    const action = { type: login.rejected.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      getUserDataRequest: false,
      getUserDataFailed: true,
    });
  });

  it('should change status with "logout.pending" action', () => {
    const action = { type: logout.pending.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({ ...initialState, logoutRequest: true });
  });

  it('should change status with "logout.fulfilled" action', () => {
    const action = { type: logout.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: false,
    });
  });

  it('should change status with "logout.rejected" action', () => {
    const action = { type: logout.rejected.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: true,
    });
  });

  it('should change status with "getUserData.pending" action', () => {
    const action = { type: getUserData.pending.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({ ...initialState, getUserDataRequest: true });
  });

  it('should change status with "getUserData.fulfilled" action', () => {
    const action = { type: getUserData.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      getUserDataRequest: false,
      getUserDataFailed: false,
    });
  });

  it('should change status with "getUserData.rejected" action', () => {
    const action = { type: getUserData.rejected.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      getUserDataRequest: false,
      getUserDataFailed: true,
    });
  });

  it('should change status with "updateUserData.pending" action', () => {
    const action = { type: updateUserData.pending.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({ ...initialState, updateUserDataRequest: true });
  });

  it('should change status with "updateUserData.fulfilled" action', () => {
    const action = { type: updateUserData.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      updateUserDataRequest: false,
      updateUserDataFailed: false,
    });
  });

  it('should change status with "updateUserData.rejected" action', () => {
    const action = { type: updateUserData.rejected.type };
    const state = profileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      updateUserDataRequest: false,
      updateUserDataFailed: true,
    });
  });
});
