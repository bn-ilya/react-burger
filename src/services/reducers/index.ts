import { combineReducers, configureStore } from '@reduxjs/toolkit';

import forgotPasswordSlice, {
  TForgotPasswordSliceActions,
} from './forgot-password/forgot-password';
import ingredientsSlice, { TIngredientsSliceActions } from './ingredients/ingredients';
import ingredientsConstructorSlice, {
  TIngredientsConstructorSliceActions,
} from './ingredients-constructor/ingredients-constructor';
import modalSlice, { TModalSliceActions } from './modal/modal';
import ordersSlice, { TOrdersSliceActions } from './orders/orders';
import profileSlice, { TProfileSliceActions } from './profile/profile';
import resetPasswordSlice from './reset-password/reset-password';
import tabsSlice, { TTabsSliceActions } from './tabs/tabs';
import totalPriceSlice, { TTotalPriceSliceActions } from './total-price/total-price';
import viewingIngredientSlice, {
  TViewingIngredientSliceActions,
} from './viewing-ingredient/viewing-ingredient';

import wsFeedsSlice, { TWsFeedSliceActions, wsActionsFeeds } from './ws-feeds/ws-feeds';
import wsOrdersSlice, { TWsOrdersSliceActions, wsActionsOrders } from './ws-orders/ws-orders';

import { socketMiddleware } from '../middleware/socket-middleware';

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
  wsFeeds: wsFeedsSlice,
  wsOrders: wsOrdersSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware<typeof wsActionsFeeds>(
        'wss://norma.nomoreparties.space/orders/all',
        wsActionsFeeds,
      ),
      socketMiddleware<typeof wsActionsOrders>(
        `wss://norma.nomoreparties.space/orders`,
        wsActionsOrders,
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
  | TWsFeedSliceActions
  | TWsOrdersSliceActions;
