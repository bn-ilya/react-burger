import styles from './main.module.css';
import LoginForm from './login-form/login-form';
import AdditionalActions from './additional-actions/additional-actions';

export default function Main() {
    return (
        <div className={styles.content}>
            <LoginForm />
            <AdditionalActions />
        </div>
    )
}