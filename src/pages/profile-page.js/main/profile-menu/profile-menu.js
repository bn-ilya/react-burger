import { Link } from "react-router-dom";
import styles from './profile-menu.module.css';

export default function ProfileMenu() {
    return (
        <div>
            <ul className={styles.list}>
                <Link className={styles.link + " text text_type_main-medium"}>Профиль</Link>
                <Link className={styles.link + " text text_type_main-medium text_color_inactive"} disabled={true}>История заказов</Link>
                <Link className={styles.link + " text text_type_main-medium text_color_inactive"} disabled={true}>Выход</Link>
            </ul>
            <span className={"text text_type_main-default " + styles.description}>
                В этом разделе вы можете
                изменить свои персональные данные
            </span>
        </div>
    )
}