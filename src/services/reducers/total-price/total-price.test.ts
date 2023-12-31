import totalPriceReducer, { initialState, setTotalPrice } from './total-price';

describe('totalPrice reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };
    expect(totalPriceReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setTotalPrice', () => {
    const mockTotalPrice = 1000;

    const action = setTotalPrice(mockTotalPrice);
    const expectedState = { ...initialState, totalPrice: mockTotalPrice };
    expect(totalPriceReducer(initialState, action)).toEqual(expectedState);
  });
});
