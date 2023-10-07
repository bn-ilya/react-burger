import { FC } from 'react';

import styles from './feed-list.module.css';

import FeedCart from '../../../../components/feed-cart/feed-cart';

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
