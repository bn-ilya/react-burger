import { FC } from 'react';

import { IFeedHeaderProps } from './feed-header-props';

import styles from './feed-header.module.css';

const FeedHeader: FC<IFeedHeaderProps> = ({ showNumberFeed = true }) => {
  return (
    <header className={styles.header}>
      {showNumberFeed && (
        <span className={`text text_type_digits-default ${styles['feed-number']}`}>#034533</span>
      )}
      <span className={`text text_type_main-medium ${styles['feed-title']}`}>
        Black Hole Singularity острый бургер
      </span>
      <span className={`text text_type_main-default ${styles['feed-status']}`}>Выполнено</span>
    </header>
  );
};

export default FeedHeader;
