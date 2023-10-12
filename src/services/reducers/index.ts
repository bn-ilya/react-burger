import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import thunkMiddleware from 'redux-thunk';

import forgotPasswordSlice, { TForgotPasswordSliceActions } from './forgot-password';
import ingredientsSlice, { TIngredientsSliceActions } from './ingredients';
import ingredientsConstructorSlice, {
  TIngredientsConstructorSliceActions,
} from './ingredients-constructor';
import modalSlice, { TModalSliceActions } from './modal';
import ordersSlice, { TOrdersSliceActions } from './orders';
import profileSlice, { TProfileSliceActions } from './profile';
import resetPasswordSlice from './reset-password';
import tabsSlice, { TTabsSliceActions } from './tabs';
import totalPriceSlice, { TTotalPriceSliceActions } from './total-price';
import viewingIngredientSlice, { TViewingIngredientSliceActions } from './viewing-ingredient';

import { TWsFeedSliceActions, wsActionsFeeds } from './wsFeeds';

import { socketMiddleware } from '../middleware/socketMiddleware';

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware<typeof wsActionsFeeds>(
        'wss://norma.nomoreparties.space/orders/all',
        wsActionsFeeds,
      ),
    ),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TAllAppActions =
  | TForgotPasswordSliceActions
  | TIngredientsConstructorSliceActions
  | TIngredientsSliceActions
  | TModalSliceActions
  | TOrdersSliceActions
  | TProfileSliceActions
  | TTabsSliceActions
  | TTotalPriceSliceActions
  | TViewingIngredientSliceActions
  | TWsFeedSliceActions;
