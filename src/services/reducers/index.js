import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from './ingredients';

const rootReducer = combineReducers({
    ingredients: ingredientsSlice 
})

export const store = configureStore({
    reducer: rootReducer
})