import styles from './main.module.css';
import RegisterForm from './register-form/register-form';

import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';
import { IAdditionalAction } from '../../../utils/types';

const Main = () => {
  const additionalActions: Array<IAdditionalAction> = [
    { text: 'Уже зарегистрированы?', link: '/login', linkText: 'Войти' },
  ];

  return (
    <div className={styles.content}>
      <RegisterForm />
      <AdditionalActionsForm additionalActions={additionalActions} />
    </div>
  );
};

export default Main;
