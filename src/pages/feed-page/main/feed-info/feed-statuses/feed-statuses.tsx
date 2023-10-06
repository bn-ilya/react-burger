import { FC } from 'react';

import { sliceArraySection } from './../../../../../utils/utils';
import styles from './feed-statuses.module.css';

const FeedStatuses: FC = () => {
  const feedsReady: Array<string> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
  ];

  const feedsReadyCols = sliceArraySection<string>(feedsReady, 10);
  const feedsProgressCols = sliceArraySection<string>(feedsReady, 10);

  return (
    <div className={styles['feed-statuses']}>
      <div className={styles['ready-feeds']}>
        <header className='text text_type_main-medium'>Готовы:</header>
        <div className={styles['feed-numbers']}>
          {feedsReadyCols.map((feedReadyCol, index) => (
            <div key={index} className={styles['feed-numbers-col']}>
              {feedReadyCol.map((feedReady, index) => (
                <span key={index} className='text text_type_digits-default'>
                  {feedReady}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['progress-feeds']}>
        <header className='text text_type_main-medium'>В работе:</header>
        <div className={styles['feed-numbers']}>
          {feedsProgressCols.map((feedProgressCol, index) => (
            <div key={index} className={styles['feed-numbers-col']}>
              {feedProgressCol.map((feedProgress, index) => (
                <span key={index} className='text text_type_digits-default'>
                  {feedProgress}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedStatuses;
