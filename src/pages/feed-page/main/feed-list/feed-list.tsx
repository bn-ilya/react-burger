import { FC } from 'react';

import FeedCart from './feed-cart/feed-cart';

import styles from './feed-list.module.css';

const FeedList: FC = () => {
  return (
    <div className={styles.content}>
      <FeedCart />
      <FeedCart />
      <FeedCart />
      <FeedCart />
      <FeedCart />
    </div>
  );
};

export default FeedList;
