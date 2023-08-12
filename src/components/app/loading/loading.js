import styles from './loading.module.css';
import BurgerSpinLoader from '../../ui/loaders/burger-spin-loader';

export default function Loading() {
    return (
        <div className={styles.content}>
            <div className={styles.loaderContainer}>
                <BurgerSpinLoader type={'secondary'} />
                <div>
                    <span className='text text_type_main-medium text_color_inactive'>Загрузка...</span>
                </div>
            </div>
        </div>
    )
}