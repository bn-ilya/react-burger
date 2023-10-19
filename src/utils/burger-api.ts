import { type AxiosRequestConfig } from 'axios';

import { instanceAxios } from './api-config';
import { IError, IRefreshRespone, TEmailUser, TNameUser, TPasswordUser, IOrder } from './types';

export const getIngredients = async <T>(): Promise<T> => {
  const res = await instanceAxios.get<T>('ingredients');
  return res.data;
};

export const getFeedByNumber = async <T>(number: IOrder['number']): Promise<T> => {
  const res = await instanceAxios.get<T>(`orders/${number}`);
  return res.data;
};

export const forgotPassword = async <T>(email: string): Promise<T> => {
  const res = await instanceAxios.post<T>(`password-reset`, {
    email,
  });

  return res.data;
};

export const resetPassword = async <T>(password: string, token: string): Promise<T> => {
  const res = await instanceAxios.post<T>(`password-reset/reset`, {
    password,
    token,
  });

  return res.data;
};

export const register = async <T>(
  email: TEmailUser,
  password: TPasswordUser,
  name: TNameUser,
): Promise<T> => {
  const res = await instanceAxios.post<T>(`auth/register`, {
    name,
    email,
    password,
  });

  return res.data;
};

export const login = async <T>(email: TEmailUser, password: TPasswordUser): Promise<T> => {
  const res = await instanceAxios.post<T>(`auth/login`, {
    email,
    password,
  });

  return res.data;
};

export const logout = async <T>(): Promise<T> => {
  const res = await instanceAxios.post<T>(`auth/logout`, {
    token: localStorage.getItem('refreshToken'),
  });

  return res.data;
};

export const refreshToken = async <T>(): Promise<T> => {
  const res = await instanceAxios.post<T>(`auth/token`, {
    token: localStorage.getItem('refreshToken'),
  });

  return res.data;
};

export const fetchWithRefresh = async <T>(url: string, options: AxiosRequestConfig): Promise<T> => {
  try {
    if (!localStorage.getItem('accessToken'))
      return Promise.reject('Токен авторизации не обноружен');
    const res = await instanceAxios<T>({ ...options, url: url });
    return res.data;
  } catch (error) {
    const errorObject = error as IError;
    if (errorObject.message === 'jwt expired') {
      const refreshData = await refreshToken<IRefreshRespone>();
      if (!refreshData.success) return Promise.reject(refreshData);
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken.split('Bearer ')[1]);
      options.headers = { Authorization: refreshData.accessToken };
      const res = await instanceAxios<T>({ ...options, url: url });
      return res.data;
    } else {
      return Promise.reject(error);
    }
  }
};

export const createOrder = async <T>(ingredientsIds: Array<string>): Promise<T> => {
  const res = await fetchWithRefresh<T>(`orders`, {
    method: 'post',
    data: { ingredients: ingredientsIds },
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });

  return res;
};

export const getUserData = async <T>(): Promise<T> => {
  const res = await fetchWithRefresh<T>(`auth/user`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });

  return res;
};

export const updateUserData = async <T>(
  name: string,
  email: string,
  password: string,
): Promise<T> => {
  const res = await fetchWithRefresh<T>('auth/user', {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
    data: {
      name,
      email,
      password,
    },
  });

  return res;
};
