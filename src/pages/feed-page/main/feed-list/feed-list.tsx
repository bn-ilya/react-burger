import { FC } from 'react';

import styles from './feed-list.module.css';

import FeedCart from '../../../../components/feed-cart/feed-cart';
import { useAppSelector } from '../../../../hooks/rtk-hooks';
import { selectFeeds } from '../../../../services/selectors';

const FeedList: FC = () => {
  const feeds = useAppSelector(selectFeeds);

  return (
    <div className={styles.content}>
      {feeds.map((feed) => (
        <FeedCart key={feed._id} {...feed} />
      ))}
    </div>
  );
};

export default FeedList;
