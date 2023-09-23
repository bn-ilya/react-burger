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
  all = '*',
}

export interface IIngredient {
  _id: string;
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
