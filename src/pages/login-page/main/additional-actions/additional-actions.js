import { Link } from 'react-router-dom';
import styles from './additional-actions.module.css';

export default function AdditionalActions() {
    return(
        <div className={styles.content}>
            <span className='text text_type_main-default text_color_inactive'>Вы новый пользователь? <Link className={styles.link}>Зарегистрироваться</Link></span>
            <span className='text text_type_main-default text_color_inactive'>Забылм пароль? <Link className={styles.link}>Восстановить пароль</Link></span>
        </div>
    )
}