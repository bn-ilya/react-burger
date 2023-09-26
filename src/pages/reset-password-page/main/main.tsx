import { FC } from 'react';

import styles from './main.module.css';
import ResetPasswordForm from './reset-password-form/reset-password-form';

import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';
import { IAdditionalAction } from '../../../utils/types';

const Main: FC = () => {
  const additionalActions: Array<IAdditionalAction> = [
    { text: 'Вспомнили пароль?', link: '/login', linkText: 'Войти' },
  ];

  return (
    <div className={styles.content}>
      <ResetPasswordForm />
      <AdditionalActionsForm additionalActions={additionalActions} />
    </div>
  );
};

export default Main;
