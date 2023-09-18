import type { FC, MouseEvent, KeyboardEvent} from 'react';
import ModalOverlayProps from './modal-overlay-props';

import styles from './modal-overlay.module.css';

const ModalOverlay: FC<ModalOverlayProps> = ({ closeModal }) => {
  const handlerClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    closeModal();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <button
      tabIndex={0}
      onClick={handlerClick}
      onKeyDown={handleKeyDown}
      className={styles.content}
    ></button>
  );
}

export default ModalOverlay;