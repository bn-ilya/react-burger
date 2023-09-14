import { combineReducers, configureStore } from '@reduxjs/toolkit';

import forgotPasswordSlice from './forgot-password';
import ingredientsSlice from './ingredients';
import ingredientsConstructorSlice from './ingredients-constructor';
import modalSlice from './modal';
import ordersSlice from './orders';
import profileSlice from './profile';
import resetPasswordSlice from './reset-password';
import tabsSlice from './tabs';
import totalPriceSlice from './total-price';
import viewingIngredientSlice from './viewing-ingredient';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  ingredientsConstructor: ingredientsConstructorSlice,
  viewingIngredient: viewingIngredientSlice,
  orders: ordersSlice,
  totalPrice: totalPriceSlice,
  modal: modalSlice,
  tabs: tabsSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  profile: profileSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});
