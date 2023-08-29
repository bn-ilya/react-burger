import Header from "../../components/header/header"
import Main from "./main/main"
import styles from './login-page.module.css';

export default function LoginPage() {
    return (
        <div className={styles.content}>
            <Header />
            <Main />
        </div>
    )
}