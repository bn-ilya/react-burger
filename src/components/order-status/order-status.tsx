import { FC } from 'react';

import { IOrderStatusProps } from './order-status-props';
import styles from './order-status.module.css';

import { IStatusesClasses, IStatusesNames } from '../../utils/types';

export const OrderStatus: FC<IOrderStatusProps> = ({ status }) => {
  const statusesName: IStatusesNames = {
    created: 'Создаётся',
    pending: 'В работе',
    done: 'Выполнено',
  };

  const statusesClasses: IStatusesClasses = {
    created: 'status-pending',
    pending: 'status-pending',
    done: 'status-done',
  };

  const statusClass = statusesClasses[status];
  return (
    <span className={`text text_type_main-default ${styles[statusClass]}`}>
      {statusesName[status]}
    </span>
  );
};
