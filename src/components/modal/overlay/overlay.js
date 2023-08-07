import styles from './overlay.module.css';

export default function Overlay({closeModal}) {

    const handlerClick = e => {
        e.stopPropagation()
        closeModal()
    }

    return (
        <div onClick={handlerClick} className={styles.content}></div>
    )
}