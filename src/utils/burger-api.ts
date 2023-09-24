import { instanceAxios } from './api-config';
import { IError } from './types';

export const getIngredients = async <T>(): Promise<T> => {
  const res = await instanceAxios.get<T>('ingredients');
  return res.data;
};

export const createOrder = async <T>(ingredientsIds: Array<string>): Promise<T> => {
  const res = await instanceAxios.post<T>(`orders`, {
    ingredients: ingredientsIds,
  });

  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await instanceAxios.post(`password-reset`, {
    email,
  });

  return res.data;
};

export const resetPassword = async (password: string, token: string) => {
  const res = await instanceAxios.post(`password-reset/reset`, {
    password,
    token,
  });

  return res.data;
};

export const register = async (email: string, password: string, name: string) => {
  const res = await instanceAxios.post(`auth/register`, {
    name,
    email,
    password,
  });

  localStorage.setItem('accessToken', res.data.accessToken.split('Bearer ')[1]);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await instanceAxios.post(`auth/login`, {
    email,
    password,
  });

  localStorage.setItem('accessToken', res.data.accessToken.split('Bearer ')[1]);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  return res.data;
};

export const logout = async () => {
  const res = await instanceAxios.post(`auth/logout`, {
    token: localStorage.getItem('refreshToken'),
  });

  localStorage.setItem('accessToken', '');
  localStorage.setItem('refreshToken', '');
  return res;
};

export const refreshToken = async () => {
  const res = await instanceAxios.post(`auth/token`, {
    token: localStorage.getItem('refreshToken'),
  });

  return res.data;
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    if (!localStorage.getItem('accessToken'))
      return Promise.reject('Токен авторизации не обноружен');
    const res = await instanceAxios(url, options);
    return res.data;
  } catch (error) {
    const errorObject = error as IError;
    if (errorObject.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) return Promise.reject(refreshData);
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken.split('Bearer ')[1]);
      options.headers = { Authorization: refreshData.accessToken };
      const res = await instanceAxios(url, options);
      return res.data;
    } else {
      return Promise.reject(error);
    }
  }
};

export const getUserData = () => {
  return fetchWithRefresh(`auth/user`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
};

export const updateUserData = (name: string, email: string, password: string) => {
  return fetchWithRefresh(`auth/user`, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};
