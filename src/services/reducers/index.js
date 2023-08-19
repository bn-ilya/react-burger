import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from './ingredients';
import ingredientsConstructorSlice from "./ingredients-constructor";
import viewingIngredientSlice from "./viewing-ingredient";
import orderSlice from './order'
import totalPriceSlice from "./total-price";

const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    ingredientsConstructor: ingredientsConstructorSlice,
    viewingIngredient: viewingIngredientSlice,
    order: orderSlice,
    totalPrice: totalPriceSlice
})

export const store = configureStore({
    reducer: rootReducer
})