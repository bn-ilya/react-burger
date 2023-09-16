import styles from './main.module.css';
import RegisterForm from './register-form/register-form';

import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';

export default function Main() {
  const additionalActions = [{ text: 'Уже зарегистрированы?', link: '/login', linkText: 'Войти' }];

  return (
    <div className={styles.content}>
      <RegisterForm />
      <AdditionalActionsForm additionalActions={additionalActions} />
    </div>
  );
}
