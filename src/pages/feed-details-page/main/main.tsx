import { FC } from 'react';

import { useParams } from 'react-router-dom';

import styles from './main.module.css';

import FeedDetails from '../../../components/feed-details/feed-details';
import { useAppSelector } from '../../../hooks/rtk-hooks';
import { Order } from '../../../services/reducers/ws-feeds/types';
import { selectFeedById } from '../../../services/selectors';

const Main: FC = () => {
  const { id } = useParams();
  const feed = useAppSelector(selectFeedById(id as Order['_id']));

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.body}>{feed && <FeedDetails order={feed} />}</div>
      </div>
    </div>
  );
};

export default Main;
