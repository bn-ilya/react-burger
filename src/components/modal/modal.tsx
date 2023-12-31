import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useNavigate } from 'react-router-dom';

import Header from './header/header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';

import IngredientDetails from '../../pages/constructor-page/burger-ingredients/ingredients/ingredient-details/ingredient-details';
import OrderDetails from '../../pages/constructor-page/order-details/order-details';

import { closeModal } from '../../services/reducers/modal/modal';
import { selectModal } from '../../services/selectors';
import { IOrder, ETypesModal, IIngredient } from '../../utils/types';

import FeedDetails from '../feed-details/feed-details';
import FeedModalHeader from '../feed-modal-header/feed-modal-header';
import ModalError from '../ui/modal-error/modal-error';

import type { FC, ReactNode } from 'react';

const modalRoot: HTMLElement | null = document.getElementById('react-modals');

const Modal: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { contentModal, typeModal, isModalOpen, goBack } = useAppSelector(selectModal);
  const [header, setHeader] = useState<ReactNode>();
  const [main, setMain] = useState<ReactNode>();

  useEffect(() => {
    if (!typeModal || !contentModal) return;
    switch (typeModal) {
      case ETypesModal.VIEWING_INGREDIENTS:
        setHeader(<span className='text text_type_main-large'>Детали ингредиента</span>);
        setMain(<IngredientDetails ingredient={contentModal as IIngredient} />);
        break;
      case ETypesModal.VIEWING_FEED:
        setHeader(<FeedModalHeader order={contentModal as IOrder} />);
        setMain(<FeedDetails showNumberFeed={false} order={contentModal as IOrder} />);
        break;
      case ETypesModal.ORDER:
        setMain(<OrderDetails number={contentModal as number} />);
        break;
      case ETypesModal.ERROR:
        setMain(<ModalError error={contentModal as string} />);
        break;
      default:
        break;
    }
  }, [typeModal, contentModal]);

  const close = useCallback((): void => {
    goBack && navigate(-1);
    dispatch(closeModal());
  }, [goBack, dispatch, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  if (!isModalOpen) return null;

  return modalRoot
    ? createPortal(
        <>
          <section className={styles.modal}>
            <div className={styles.content} data-cy='modal'>
              <button
                tabIndex={0}
                onClick={() => close()}
                className={styles.close}
                data-cy='btn-close-modal'
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
      )
    : null;
};

export default Modal;
