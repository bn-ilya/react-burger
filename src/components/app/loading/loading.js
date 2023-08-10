import styles from './loading.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Loading() {
    return (
        <div className={styles.content}>
            <div className={styles.loaderContainer}>
                <div className={styles.loader}><BurgerIcon type="secondary" /></div>
                <div>
                    <span className='text text_type_main-medium text_color_inactive'>Загрузка...</span>
                </div>
            </div>
        </div>
    )
}