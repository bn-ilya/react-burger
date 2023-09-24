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
    if (config.method === 'post' || config.method === 'patch') {
      if (!config.headers.length) {
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
      }

      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
