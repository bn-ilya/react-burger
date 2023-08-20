import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Header from './header/header';
import ModalOverlay from "./modal-overlay/modal-overlay";
import IngredientDetails from "../burger-ingredients/ingredients/ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import ModalError from "../ui/modal-error/modal-error";

import { closeModal } from "../../services/reducers/modal";
import { useSelector, useDispatch } from 'react-redux';

const modalRoot = document.getElementById("react-modals");

export default function Modal() {

    const dispatch = useDispatch();
    const { contentModal, typeModal, isModalOpen } = useSelector(state => state.modal);
    const [header, setHeader] = useState(null);
    const [main, setMain] = useState(null);

    useEffect(() => {
        const handleKeyDown = e => {
            e.code === 'Escape' && dispatch(closeModal());
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeModal]);

    useEffect(() => {
        switch (typeModal) {
            case 'viewingIngredient':
                setHeader(<span className='text text_type_main-large'>Детали ингредиента</span>)
                setMain(<IngredientDetails ingredient={contentModal} />)
                break;
            case 'order':
                setMain(<OrderDetails number={contentModal} />)
                break;
            case 'error':
                setMain(<ModalError error={contentModal} />)
                break;
        }
    }, [typeModal])

    if (!isModalOpen) return null;

    return createPortal(
        (
            <>
                <section className={styles.modal}>
                    <div className={styles.content}>
                        <div onClick={() => dispatch(closeModal())} className={styles.close}>
                            <CloseIcon type="primary" />
                        </div>
                        {header && (<Header children={header} />)}
                        {main}
                    </div>
                </section>
                <ModalOverlay closeModal={() => dispatch(closeModal())} />
            </>
        ),
        modalRoot
    )
}