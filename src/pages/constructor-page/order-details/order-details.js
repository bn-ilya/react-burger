import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { PropTypes } from 'prop-types';

import styles from './order-details.module.css';

import IconsBackground from '../../../components/ui/icons/icons-background';

export default function OrderDetails({ number }) {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <span className={styles.identifier + ' text text_type_digits-large'}>
          {number}
        </span>
        <span className='text text_type_main-medium'>идентификатор заказа</span>
      </div>
      <div className={styles.doneLabel}>
        <div className={styles.doneIcon}>
          <CheckMarkIcon />
        </div>
        <IconsBackground />
      </div>
      <div className={styles.status}>
        <span className='text text_type_main-default'>
          Ваш заказ начали готовить
        </span>
        <span className='text text_type_main-default text_color_inactive'>
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
