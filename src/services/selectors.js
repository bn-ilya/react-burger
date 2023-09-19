import { createSelector } from '@reduxjs/toolkit';

export const selectNameUser = (state) => state.profile.name;
export const selectEmailUser = (state) => state.profile.email;

export const selectUserData = createSelector([selectNameUser, selectEmailUser], (name, email) => {
  return { name, email };
});

export const selectIsAuth = createSelector([selectNameUser, selectEmailUser], (name, email) => {
  return !name || !email ? false : true;
});

export const selectUserDataRequest = (state) => state.profile.getUserDataRequest;
export const selectUserDataFailed = (state) => state.profile.getUserDataFailed;

export const selectUserDataFetch = createSelector(
  [selectUserDataRequest, selectUserDataFailed],
  (request, failed) => ({ request, failed }),
);

export const selectUpdateUserDataRequest = (state) => state.profile.updateUserDataRequest;

export const selectIsForgotPassword = (state) => state.forgotPassword.forgotPassword;

export const selectSauces = (state) => state.ingredients.sauces;
export const selectMains = (state) => state.ingredients.mains;
export const selectBuns = (state) => state.ingredients.buns;

export const selectIngredientById = (ingredientId) =>
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

export const selectForgotPasswordRequest = (state) => state.forgotPassword.forgotPasswordRequest;
export const selectResetPasswordRequest = (state) => state.resetPassword.resetPasswordRequest;
export const selectGoBack = (state) => state.modal.goBack;
// Модальное окно
export const selectContentModal = (state) => state.modal.contentModal;
export const selectTypeModal = (state) => state.modal.typeModal;
export const selectIsModalOpen = (state) => state.modal.isModalOpen;
export const selectGoback = (state) => state.modal.goBack;
export const selectModal = createSelector(
  [selectContentModal, selectTypeModal, selectIsModalOpen, selectGoback],
  (contentModal, typeModal, isModalOpen, goBack) => {
    return { contentModal, typeModal, isModalOpen, goBack };
  },
);
// Ингредиенты
export const ingredientsRequest = (state) => state.ingredients.ingredientsRequest;
export const ingredientsFailed = (state) => state.ingredients.ingredientsFailed;
