import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Header from './header/header';
import Overlay from "./overlay/overlay";
import { modalHeaderType, modalMainType } from "../../utils/types";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

export default function Modal({ header, main, closeModal, ...props }) {

    useEffect(() => {
        const handleKeyDown = e => {
            e.code === 'Escape' && closeModal();
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    return createPortal(
        (
            <>
                <section className={styles.modal}>
                    <div className={styles.content}>
                        <div onClick={closeModal} className={styles.close}>
                            <CloseIcon type="primary" />
                        </div>
                        {header && (<Header children={header} />)}
                        {props.children}
                    </div>
                </section>
                <Overlay closeModal={closeModal} />
            </>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    header: modalHeaderType,
    main: modalMainType.isRequired,
    closeModal: PropTypes.func.isRequired
}