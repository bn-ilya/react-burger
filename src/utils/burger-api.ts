import { IError } from './types';

const URL_API = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = (url: string, options: RequestInit | undefined = undefined) => {
  return fetch(url, options)
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const getIngredients = async () => {
  const res = await request(`${URL_API}/ingredients`);
  return res.data;
};

export const createOrder = async (ingredientsIds: Array<string>) => {
  const res = await request(`${URL_API}/orders`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });

  return { name: res.name, order: res.order };
};

export const forgotPassword = async (email: string) => {
  const res = await request(`${URL_API}/password-reset`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });
  return res;
};

export const resetPassword = async (password: string, token: string) => {
  const res = await request(`${URL_API}/password-reset/reset`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });
  return res;
};

export const register = async (email: string, password: string, name: string) => {
  const res = await request(`${URL_API}/auth/register`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res;
};

export const login = async (email: string, password: string) => {
  const res = await request(`${URL_API}/auth/login`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res;
};

export const logout = async () => {
  const res = await request(`${URL_API}/auth/logout`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
  localStorage.setItem('accessToken', '');
  localStorage.setItem('refreshToken', '');
  return res;
};

export const refreshToken = async (): Promise<any> => {
  await request(`${URL_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    if (!localStorage.getItem('accessToken'))
      return Promise.reject('Токен авторизации не обноружен');
    const res = await request(url, options);
    return res;
  } catch (error) {
    const errorObject = error as IError;
    if (errorObject.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) return Promise.reject(refreshData);
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken.split('Bearer ')[1]);
      options.headers = { Authorization: refreshData.accessToken };
      const res = await request(url, options);
      return res;
    } else {
      return Promise.reject(error);
    }
  }
};

export const getUserData = () => {
  return fetchWithRefresh(`${URL_API}/auth/user`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
};

export const updateUserData = (name: string, email: string, password: string) => {
  return fetchWithRefresh(`${URL_API}/auth/user`, {
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
