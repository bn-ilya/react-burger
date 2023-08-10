import styles from './modal-overlay.module.css';

export default function ModalOverlay({closeModal}) {

    const handlerClick = e => {
        e.stopPropagation()
        closeModal()
    }

    return (
        <div onClick={handlerClick} className={styles.content}></div>
    )
}