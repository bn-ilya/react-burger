import { FC } from 'react';

import { useParams } from 'react-router-dom';

import styles from './main.module.css';

import FeedDetails from '../../../components/feed-details/feed-details';
import { useFeedByNumber } from '../../../hooks/useFeedByNumber';
import { IOrder, IRouteParams } from '../../../utils/types';

const Main: FC = () => {
  const { number } = useParams<IRouteParams>();
  const feed = useFeedByNumber(Number(number) as IOrder['number']);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.body}>{feed && <FeedDetails order={feed} />}</div>
      </div>
    </div>
  );
};

export default Main;
