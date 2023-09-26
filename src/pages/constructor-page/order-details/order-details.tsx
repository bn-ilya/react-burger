import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { FC } from 'react';

import { IOrderDetailsProps } from './order-details-props';
import styles from './order-details.module.css';

import IconsBackground from '../../../components/ui/icons/icons-background';

const OrderDetails: FC<IOrderDetailsProps> = ({ number }) => {
  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <span className={styles.identifier + ' text text_type_digits-large'}>{number}</span>
        <span className='text text_type_main-medium'>идентификатор заказа</span>
      </div>
      <div className={styles.doneLabel}>
        <div className={styles.doneIcon}>
          <CheckMarkIcon type='primary' />
        </div>
        <IconsBackground />
      </div>
      <div className={styles.status}>
        <span className='text text_type_main-default'>Ваш заказ начали готовить</span>
        <span className='text text_type_main-default text_color_inactive'>
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </div>
  );
};

export default OrderDetails;
