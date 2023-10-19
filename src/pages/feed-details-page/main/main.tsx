import { FC } from 'react';

import { useParams } from 'react-router-dom';

import styles from './main.module.css';

import FeedDetails from '../../../components/feed-details/feed-details';
import { useAppSelector } from '../../../hooks/rtk-hooks';
import { useFeedByNumber } from '../../../hooks/useFeedByNumber';
import { IFeed } from '../../../services/reducers/ws-feeds/types';
import { selectFeedById } from '../../../services/selectors';
import { IRouteParams } from '../../../utils/types';

const Main: FC = () => {
  const { number } = useParams<IRouteParams>();
  const feed = useFeedByNumber(Number(number) as IFeed['number']);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.body}>{feed && <FeedDetails order={feed} />}</div>
      </div>
    </div>
  );
};

export default Main;
