import { createSelector } from "@reduxjs/toolkit";

export const selectNameUser = state => state.profile.name;
export const selectEmailUser = state => state.profile.email;

export const selectUserData = createSelector(
    [selectNameUser, selectEmailUser],
    (name, email) => {
        return {name, email}
    }
);

export const getUserDataRequest = state => state.profile.getUserDataRequest;
export const getUserDataFailed = state => state.profile.getUserDataFailed;

export const selectUserDataFetch = createSelector(
    [getUserDataRequest, getUserDataFailed],
    (request, failed) => ({request, failed})
)

export const selectUpdateUserDataRequest = state => state.profile.updateUserDataRequest;