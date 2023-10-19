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
  profileOrdersId = '/profile/orders/:number',
  ingredientId = '/ingredients/:id',
  feed = '/feed',
  feedId = '/feed/:number',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onerror: ActionCreatorWithPayload<any>;
  onclose: ActionCreatorWithoutPayload;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onmessage: ActionCreatorWithPayload<any>;
}

export type SliceActions<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T];

export interface IStatusesNames {
  [key: string]: string;
}

export interface IStatusesClasses {
  [key: string]: 'status-pending' | 'status-done';
}

export enum EStatuses {
  CANCELLED = 'canceled',
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done',
}

export type IRouteParams = {
  id: string;
  number: string;
};

export interface Owner {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: EStatuses;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderWithOwner extends IOrder {
  owner: Owner;
}
