import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from './ingredients';
import ingredientsConstructorSlice from "./ingredients-constructor";
import viewingIngredientSlice from "./viewing-ingredient";
import ordersSlice from './orders'
import totalPriceSlice from "./total-price";
import modalSlice from './modal';
import tabsSlice from './tabs';
import forgotPasswordSlice from './forgot-password';
import resetPasswordSlice from './reset-password';
import profileSlice from './profile';

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
    profile: profileSlice
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === "development"
})