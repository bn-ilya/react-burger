import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

import { IModalError } from './modal-error-props';

import styles from './modal-error.module.css';

const ModalError: FC<IModalError> = ({ error }) => {
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
        <div className={'text text_type_main-default ' + styles.errorText}>{error}</div>
      </div>
    </>
  );
};

export default ModalError;
