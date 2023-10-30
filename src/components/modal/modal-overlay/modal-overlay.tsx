import IModalOverlayProps from './modal-overlay-props';

import styles from './modal-overlay.module.css';

import type { FC, MouseEvent } from 'react';

const ModalOverlay: FC<IModalOverlayProps> = ({ closeModal }) => {
  const handlerClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    closeModal();
  };

  return <button tabIndex={0} onClick={handlerClick} className={styles.content}></button>;
};

export default ModalOverlay;
