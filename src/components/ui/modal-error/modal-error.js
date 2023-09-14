import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { PropTypes } from 'prop-types';

import styles from './modal-error.module.css';

export default function ModalError({ error }) {
  return (
    <>
      <div className={styles.errorContainer}>
        <div className={styles.header}>
          <div>
            <CloseIcon type='secondary' />
          </div>
          <div>
            <span className='text text_type_main-medium text_color_inactive'>
              Данк фаррик! Произошла ошибка
            </span>
          </div>
        </div>
        <div className={'text text_type_main-default ' + styles.errorText}>
          {error}
        </div>
      </div>
    </>
  );
}

ModalError.propTypes = {
  error: PropTypes.string.isRequired,
};
