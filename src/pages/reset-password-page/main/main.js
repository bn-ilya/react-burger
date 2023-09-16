import styles from './main.module.css';
import ResetPasswordForm from './reset-password-form/reset-password-form';

import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';

export default function Main() {
  const additionalActions = [{ text: 'Вспомнили пароль?', link: '/login', linkText: 'Войти' }];

  return (
    <div className={styles.content}>
      <ResetPasswordForm />
      <AdditionalActionsForm additionalActions={additionalActions} />
    </div>
  );
}
