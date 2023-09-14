import { PropTypes } from 'prop-types';

import styles from './modal-overlay.module.css';

export default function ModalOverlay({ closeModal }) {
  const handlerClick = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={handlerClick}
      onKeyDown={handleKeyDown}
      className={styles.content}
    ></div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
