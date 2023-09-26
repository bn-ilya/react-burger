import { FC } from 'react';

import LoginForm from './login-form/login-form';
import styles from './main.module.css';

import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';
import { IAdditionalAction } from '../../../utils/types';

const Main: FC = () => {
  const additionalActions: Array<IAdditionalAction> = [
    {
      text: 'Вы новый пользователь?',
      link: '/register',
      linkText: 'Зарегистрироваться',
    },
    {
      text: 'Забыли пароль?',
      link: '/forgot-password',
      linkText: 'Восстановить пароль',
    },
  ];

  return (
    <div className={styles.content}>
      <LoginForm />
      <AdditionalActionsForm additionalActions={additionalActions} />
    </div>
  );
};

export default Main;
