import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './header/header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

import IngredientDetails from '../../pages/constructor-page/burger-ingredients/ingredients/ingredient-details/ingredient-details';

import OrderDetails from '../../pages/constructor-page/order-details/order-details';

import { closeModal } from '../../services/reducers/modal';
import ModalError from '../ui/modal-error/modal-error';

const modalRoot = document.getElementById('react-modals');

export default function Modal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contentModal, typeModal, isModalOpen } = useSelector(
    (state) => state.modal,
  );
  const goBack = useSelector((state) => state.modal.goBack);
  const [header, setHeader] = useState(null);
  const [main, setMain] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.code === 'Escape' && dispatch(closeModal());
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  useEffect(() => {
    switch (typeModal) {
      case 'viewingIngredient':
        setHeader(
          <span className='text text_type_main-large'>Детали ингредиента</span>,
        );
        setMain(<IngredientDetails ingredient={contentModal} />);
        break;
      case 'order':
        setMain(<OrderDetails number={contentModal} />);
        break;
      case 'error':
        setMain(<ModalError error={contentModal} />);
        break;
      default:
        break;
    }
  }, [typeModal, contentModal]);

  if (!isModalOpen) return null;

  const close = () => {
    goBack && navigate(-1);
    dispatch(closeModal());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      close();
    }
  };

  return createPortal(
    <>
      <section className={styles.modal}>
        <div className={styles.content}>
          <div
            role='button'
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={() => close()}
            className={styles.close}
          >
            <CloseIcon type='primary' />
          </div>
          {header && <Header>{header}</Header>}
          {main}
        </div>
      </section>
      <ModalOverlay closeModal={() => close()} />
    </>,
    modalRoot,
  );
}
