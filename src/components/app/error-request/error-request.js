import styles from './error-request.module.css';
import { CloseIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function ErrorRequest({ onClick }) {
    return (
        <div className={styles.content}>
            <div className={styles.errorContainer}>
                <div><CloseIcon type="secondary" /></div>
                <div>
                    <span className='text text_type_main-medium text_color_inactive'>Данк фаррик! Произошла ошибка при получении данных</span>
                </div>
            </div>
            <div className={styles.reloadContainer}>
                <Button onClick={onClick} htmlType="button" type="primary" size="small" extraClass="ml-2">
                    <span className='text text_type_main-small'>Давай по новой</span>
                </Button>
            </div>
        </div>
    )
}

ErrorRequest.propTypes = {
    onClick: PropTypes.func.isRequired
}