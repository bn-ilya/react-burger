import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from './ingredients';
import ingredientsConstructorSlice from "./ingredients-constructor";
import viewingIngredientSlice from "./viewing-ingredient";
import ordersSlice from './orders'
import totalPriceSlice from "./total-price";
import modalSlice from './modal';
import tabsSlice from './tabs';

const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    ingredientsConstructor: ingredientsConstructorSlice,
    viewingIngredient: viewingIngredientSlice,
    orders: ordersSlice,
    totalPrice: totalPriceSlice,
    modal: modalSlice,
    tabs: tabsSlice
})

export const store = configureStore({
    reducer: rootReducer
})