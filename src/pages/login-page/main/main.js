import styles from './main.module.css';
import LoginForm from './login-form/login-form';

export default function Main() {
    return (
        <div className={styles.content}>
            <LoginForm/>
        </div>
    )
}