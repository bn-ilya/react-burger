import styles from './main.module.css';
import LoginForm from './login-form/login-form';
import AdditionalActionsForm from '../../../components/additional-actions-form/additional-actions-form';

export default function Main() {
    
    const additionalActions = [
        {text:'Вы новый пользователь?', link: '/register', linkText: 'Зарегистрироваться' },
        {text: 'Забыли пароль?', link:'/forgot-password', linkText:'Восстановить пароль'}
    ]

    return (
        <div className={styles.content}>
            <LoginForm />
            <AdditionalActionsForm additionalActions={additionalActions} />
        </div>
    )
}