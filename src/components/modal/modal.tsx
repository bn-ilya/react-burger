import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  useEffect,
  useState,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';

import { useNavigate } from 'react-router-dom';

import Header from './header/header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';

import IngredientDetails from '../../pages/constructor-page/burger-ingredients/ingredients/ingredient-details/ingredient-details';
import OrderDetails from '../../pages/constructor-page/order-details/order-details';

import { closeModal } from '../../services/reducers/modal';
import { selectModal } from '../../services/selectors';
import ModalError from '../ui/modal-error/modal-error';

const modalRoot: HTMLElement | null = document.getElementById('react-modals');

export default function Modal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { contentModal, typeModal, isModalOpen, goBack } = useAppSelector(selectModal);
  const [header, setHeader] = useState<ReactNode>();
  const [main, setMain] = useState<ReactNode>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.code === 'Escape' && dispatch(closeModal());
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  useEffect(() => {
    switch (typeModal) {
      case 'viewingIngredient':
        setHeader(<span className='text text_type_main-large'>Детали ингредиента</span>);
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

  const close = (): void => {
    goBack && navigate(-1);
    dispatch(closeModal());
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      close();
    }
  };

  if (modalRoot !== null) {
    return createPortal(
      <>
        <section className={styles.modal}>
          <div className={styles.content}>
            <button
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onClick={() => close()}
              className={styles.close}
            >
              <CloseIcon type='primary' />
            </button>
            {header && <Header>{header}</Header>}
            {main}
          </div>
        </section>
        <ModalOverlay closeModal={() => close()} />
      </>,
      modalRoot,
    );
  }
}
