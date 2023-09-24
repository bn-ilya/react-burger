import axios from 'axios';

import { IError } from './types';

const URL_API = 'https://norma.nomoreparties.space/api';

export const instanceAxios = axios.create({
  baseURL: URL_API,
});

instanceAxios.interceptors.response.use(
  function (response) {
    if (response.data?.success) return response;
    const objectError: IError = { message: 'Failed success data' };
    return Promise.reject(objectError);
  },
  function (error) {
    return Promise.reject(error);
  },
);

instanceAxios.interceptors.request.use(
  (config) => {
    if (config.method === 'post' && !config.headers.length) {
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getIngredients = async () => {
  const res = await instanceAxios.get('ingredients');
  return res.data.data;
};

export const createOrder = async (ingredientsIds: Array<string>) => {
  const res = await instanceAxios.post(
    `orders`,
    JSON.stringify({
      ingredients: ingredientsIds,
    }),
  );

  return { name: res.data.name, order: res.data.order };
};

export const forgotPassword = async (email: string) => {
  const res = await instanceAxios.post(
    `password-reset`,
    JSON.stringify({
      email,
    }),
  );

  return res.data;
};

export const resetPassword = async (password: string, token: string) => {
  const res = await instanceAxios.post(
    `password-reset/reset`,
    JSON.stringify({
      password,
      token,
    }),
  );

  return res.data;
};

export const register = async (email: string, password: string, name: string) => {
  const res = await instanceAxios.post(
    `auth/register`,
    JSON.stringify({
      name,
      email,
      password,
    }),
  );

  localStorage.setItem('accessToken', res.data.accessToken.split('Bearer ')[1]);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await instanceAxios.post(
    `auth/login`,
    JSON.stringify({
      email,
      password,
    }),
  );

  localStorage.setItem('accessToken', res.data.accessToken.split('Bearer ')[1]);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  return res.data;
};

export const logout = async () => {
  const res = await instanceAxios.post(
    `auth/logout`,
    JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  );

  localStorage.setItem('accessToken', '');
  localStorage.setItem('refreshToken', '');
  return res;
};

export const refreshToken = async () => {
  const res = await instanceAxios.post(
    `auth/token`,
    JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  );

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
    method: 'PATCH',
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
