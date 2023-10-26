import TabsSlice, { IInitialState } from './tabs';

import { EIngredients } from '../../../utils/types';

describe('Order reducer', () => {
  const state: IInitialState = {
    activeTab: EIngredients.BUN,
  };

  it('should handle initial state', () => {
    const initialState: IInitialState = state;
    const action = { type: 'unknown' };
    const expectedState = initialState;

    expect(TabsSlice(initialState, action)).toEqual(expectedState);
  });
});
