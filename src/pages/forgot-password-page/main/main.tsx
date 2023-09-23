import { FC } from 'react';

import ForgotPasswordForm from './forgot-password-form/forgot-password-form';
import styles from './main.module.css';

import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';

const Main: FC = () => {
  const additionalActions = [{ text: 'Вспомнили пароль?', link: '/login', linkText: 'Войти' }];

  return (
    <div className={styles.content}>
      <ForgotPasswordForm />
      <AdditionalActionsForm additionalActions={additionalActions} />
    </div>
  );
};

export default Main;
