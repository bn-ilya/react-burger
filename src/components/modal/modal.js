import { createPortal } from "react-dom";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Header from './header/header';
import { modalHeaderType } from "../../utils/types";

const modalRoot = document.getElementById("react-modals");

export default function Modal({header}) {
    return createPortal(
        (
            <section className={styles.modal}>
                <div className={styles.content}>
                    <div className={styles.close}>
                        <CloseIcon type="primary" />
                    </div>
                    {header && (<Header children={header}/>)}
                </div>
            </section>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    header: modalHeaderType
}