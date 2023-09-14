import ForgotPasswordForm from './forgot-password-form/forgot-password-form';
import styles from './main.module.css';

import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';

export default function Main() {
  const additionalActions = [
    { text: 'Вспомнили пароль?', link: '/login', linkText: 'Войти' },
  ];

  return (
    <div className={styles.content}>
      <ForgotPasswordForm />
      <AdditionalActionsForm additionalActions={additionalActions} />
    </div>
  );
}
