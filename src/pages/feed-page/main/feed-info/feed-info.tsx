import styles from './feed-info.module.css';

import FeedStatuses from './feed-statuses/feed-statuses';

import { useAppSelector } from '../../../../hooks/rtk-hooks';
import { selectTotalFeeds, selectTotalTodayFeeds } from '../../../../services/selectors';

const FeedInfo = () => {
  const totalToday = useAppSelector(selectTotalTodayFeeds);
  const total = useAppSelector(selectTotalFeeds);

  return (
    <div className={styles.content}>
      <FeedStatuses />
      <div className={styles['feed-statistics']}>
        <div className={styles['feed-statistic']}>
          <span className='text text_type_main-medium'>Выполнено за все время:</span>
          <span className='text text_type_digits-large'>{total}</span>
        </div>
        <div className={styles['feed-statistic']}>
          <span className='text text_type_main-medium'>Выполнено за сегодня:</span>
          <span className='text text_type_digits-large'>{totalToday}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedInfo;
