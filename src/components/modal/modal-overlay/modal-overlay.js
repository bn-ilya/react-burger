import styles from './modal-overlay.module.css';
import {PropTypes} from 'prop-types';

export default function ModalOverlay({closeModal}) {

    const handlerClick = e => {
        e.stopPropagation()
        closeModal()
    }

    return (
        <div onClick={handlerClick} className={styles.content}></div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}