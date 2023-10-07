import { ReactElement } from 'react';

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
  profile = '/profile',
  profileOrders = '/profile/orders',
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
}

export type TEmailUser = string;
export type TNameUser = string;
export type TPasswordUser = string;
