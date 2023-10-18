import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useNavigate } from 'react-router-dom';

import Header from './header/header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';

import IngredientDetails from '../../pages/constructor-page/burger-ingredients/ingredients/ingredient-details/ingredient-details';
import OrderDetails from '../../pages/constructor-page/order-details/order-details';

import { closeModal } from '../../services/reducers/modal';
import { IFeed } from '../../services/reducers/ws-feeds/types';
import { selectModal } from '../../services/selectors';
import { ETypesModal, IIngredient } from '../../utils/types';
import FeedDetails from '../feed-details/feed-details';
import FeedModalHeader from '../feed-modal-header/feed-modal-header';
import ModalError from '../ui/modal-error/modal-error';

import type { FC, ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react';

const modalRoot: HTMLElement | null = document.getElementById('react-modals');

const Modal: FC = () => {
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
    if (!typeModal || !contentModal) return;
    switch (typeModal) {
      case ETypesModal.VIEWING_INGREDIENTS:
        setHeader(<span className='text text_type_main-large'>Детали ингредиента</span>);
        setMain(<IngredientDetails ingredient={contentModal as IIngredient} />);
        break;
      case ETypesModal.VIEWING_FEED:
        setHeader(<FeedModalHeader order={contentModal as IFeed} />);
        setMain(<FeedDetails showNumberFeed={false} order={contentModal as IFeed} />);
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

  return modalRoot
    ? createPortal(
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
      )
    : null;
};

export default Modal;
