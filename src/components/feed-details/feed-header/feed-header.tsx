import { FC } from 'react';

import { OrderStatus } from './../../order-status/order-status';
import { IFeedHeaderProps } from './feed-header-props';

import styles from './feed-header.module.css';

const FeedHeader: FC<IFeedHeaderProps> = ({ showNumberFeed = true, name, number, status }) => {
  return (
    <header className={styles.header}>
      {showNumberFeed && (
        <span className={`text text_type_digits-default ${styles['feed-number']}`}>#{number}</span>
      )}
      <span className={`text text_type_main-medium ${styles['feed-title']}`}>{name}</span>
      <OrderStatus status={status} />
    </header>
  );
};

export default FeedHeader;
