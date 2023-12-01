import tabsReducer, { initialState, setActiveTab } from './tabs';

import { EIngredients } from '../../../utils/types';

describe('tabs reducer', () => {
  it('should handle initial state', () => {
    const action = { type: 'unknown' };

    expect(tabsReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle setActiveTab', () => {
    const mockActiveTab = EIngredients.MAIN;

    const action = setActiveTab(mockActiveTab);
    const expectedState = { ...initialState, activeTab: mockActiveTab };
    expect(tabsReducer(initialState, action)).toEqual(expectedState);
  });
});
