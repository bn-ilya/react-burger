import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
import { Provider } from 'react-redux';

import App from './components/app/app';

import { store } from './services/reducers/index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
