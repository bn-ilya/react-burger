import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './reducers';

import { IIngredient } from '../utils/types';

export const selectNameUser = (state: RootState) => state.profile.name;
export const selectEmailUser = (state: RootState) => state.profile.email;

export const selectUserData = createSelector([selectNameUser, selectEmailUser], (name, email) => {
  return { name, email };
});

export const selectIsAuth = createSelector([selectNameUser, selectEmailUser], (name, email) => {
  return !name || !email ? false : true;
});

export const selectUserDataRequest = (state: RootState) => state.profile.getUserDataRequest;
export const selectUserDataFailed = (state: RootState) => state.profile.getUserDataFailed;

export const selectUserDataFetch = createSelector(
  [selectUserDataRequest, selectUserDataFailed],
  (request, failed) => ({ request, failed }),
);

export const selectUpdateUserDataRequest = (state: RootState) =>
  state.profile.updateUserDataRequest;

export const selectIsForgotPassword = (state: RootState) => state.forgotPassword.forgotPassword;

export const selectForgotPasswordRequest = (state: RootState) =>
  state.forgotPassword.forgotPasswordRequest;
export const selectResetPasswordRequest = (state: RootState) =>
  state.resetPassword.resetPasswordRequest;
export const selectGoBack = (state: RootState) => state.modal.goBack;
// Модальное окно
export const selectContentModal = (state: RootState) => state.modal.contentModal;
export const selectTypeModal = (state: RootState) => state.modal.typeModal;
export const selectIsModalOpen = (state: RootState) => state.modal.isModalOpen;
export const selectGoback = (state: RootState) => state.modal.goBack;
export const selectModal = createSelector(
  [selectContentModal, selectTypeModal, selectIsModalOpen, selectGoback],
  (contentModal, typeModal, isModalOpen, goBack) => {
    return { contentModal, typeModal, isModalOpen, goBack };
  },
);
// Ingredients
export const selectIngredientsRequest = (state: RootState) => state.ingredients.ingredientsRequest;
export const selectIngredientsFailed = (state: RootState) => state.ingredients.ingredientsFailed;

export const selectSauces = (state: RootState) => state.ingredients.sauces;
export const selectMains = (state: RootState) => state.ingredients.mains;
export const selectBuns = (state: RootState) => state.ingredients.buns;
export const selectIngredients = createSelector(
  [selectSauces, selectMains, selectBuns],
  (sauces, mains, buns) => {
    return [...sauces, ...mains, ...buns];
  },
);

export const selectIngredientById = (ingredientId: string | undefined) =>
  createSelector([selectBuns, selectMains, selectSauces], (buns, mains, sauces) => {
    const ingredients = [...buns, ...mains, ...sauces];
    return ingredients.find((ingredient) => ingredient['_id'] === ingredientId);
  });

export const selectIsLoadedIngredients = createSelector(
  [selectBuns, selectMains, selectSauces],
  (buns, mains, sauces) => {
    return [...buns, ...mains, ...sauces].length ? true : false;
  },
);
// Tabs
export const selectActiveTab = (state: RootState) => state.tabs.activeTab;
// Orders
export const selectOrderRequest = (state: RootState) => state.orders.orderRequest;
// Total price
export const selectTotalPrice = (state: RootState) => state.totalPrice.totalPrice;
// IngredientsConstructor
export const selectIngredientsConstructor = (state: RootState) =>
  state.ingredientsConstructor.ingredients;
export const selectBunTopConstructor = (state: RootState) => state.ingredientsConstructor.bunTop;
export const selectBunBottomConstructor = (state: RootState) =>
  state.ingredientsConstructor.bunBottom;
export const selectAllIngredientsConstructor = createSelector(
  [selectIngredientsConstructor, selectBunTopConstructor, selectBunBottomConstructor],
  (ingredients, bunTop, bunBottom) => {
    return { ingredients, bunTop, bunBottom };
  },
);
// Feeds
export const selectFeeds = (state: RootState) => state.wsFeeds.feeds;
export const selectWsFeedsConnected = (state: RootState) => state.wsFeeds.wsConnected;
export const selectImagesIngredients = (ingredientsId: Array<IIngredient['_id']>) =>
  createSelector([selectBuns, selectMains, selectSauces], (buns, mains, sauces) => {
    const ingredients = [...buns, ...mains, ...sauces];

    const ingredientsImages = ingredientsId.map((ingredientId) => {
      const ingredient = ingredients.find((ingredient) => ingredient._id === ingredientId);
      return ingredient?.image_mobile;
    });

    return ingredientsImages;
  });
export const selectTotalPriceFeeds = (ingredientsId: Array<IIngredient['_id']>) =>
  createSelector([selectIngredients], (ingredients) => {
    const total = ingredientsId.reduce((reduce, ingredientId) => {
      const price = ingredients.find((ingredient) => ingredientId === ingredient._id);
      return price ? price.price + reduce : reduce;
    }, 0);

    return total;
  });
