import styles from './feed-info.module.css';
import FeedStatuses from './feed-statuses/feed-statuses';

const FeedInfo = () => {
  return (
    <div className={styles.content}>
      <FeedStatuses />
      <div className={styles['feed-statistics']}>
        <div className={styles['feed-statistic']}>
          <span className='text text_type_main-medium'>Выполнено за все время:</span>
          <span className='text text_type_digits-large'>28 752</span>
        </div>
        <div className={styles['feed-statistic']}>
          <span className='text text_type_main-medium'>Выполнено за сегодня:</span>
          <span className='text text_type_digits-large'>138</span>
        </div>
      </div>
    </div>
  );
};

export default FeedInfo;
