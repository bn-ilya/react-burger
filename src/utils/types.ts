import { ReactElement } from 'react';

import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export enum EIngredients {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export enum ERoutes {
  home = '/',
  login = '/login',
  register = '/register',
  resetPassword = '/reset-password',
  forgotPassword = '/forgot-password',
  profile = '/profile/*',
  profileOrders = 'orders',
  profileOrdersId = '/profile/orders/:id',
  ingredientId = '/ingredients/:id',
  feed = '/feed',
  feedId = '/feed/:id',
  all = '*',
}

export type TIdIngredient = string;

export interface IIngredient {
  _id: TIdIngredient;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
}

export interface IIngredientConstructor extends IIngredient {
  uniqueId: string;
  index?: number;
}

export interface IProtectedRouteElement {
  element: ReactElement;
  accessAuth: boolean;
}

export interface IAdditionalAction {
  text: string;
  link: string;
  linkText: string;
}

export interface IError {
  message: string;
}

export interface IErrorsForm {
  [key: string]: string;
}

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

export interface IRefreshRespone {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IIngredientsCount {
  [id: string]: number;
}

export enum ETypesModal {
  ERROR = 'error',
  ORDER = 'order',
  VIEWING_INGREDIENTS = 'viewingIngredient',
  VIEWING_FEED = 'viewingFeed',
}

export type TEmailUser = string;
export type TNameUser = string;
export type TPasswordUser = string;

export interface IWsActions {
  init: ActionCreatorWithoutPayload;
  send: ActionCreatorWithoutPayload;
  onsuccess: ActionCreatorWithoutPayload;
  onerror: ActionCreatorWithPayload<any>;
  onclose: ActionCreatorWithoutPayload;
  onmessage: ActionCreatorWithPayload<any>;
}

export type SliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T];

export interface IStatusesNames {
  [key: string]: string;
}

export interface IStatusesClasses {
  [key: string]: 'status-pending' | 'status-done';
}

export enum EStatuses {
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done',
}
