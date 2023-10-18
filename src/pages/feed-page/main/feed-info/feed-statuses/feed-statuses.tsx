import { FC } from 'react';

import { sliceArraySection } from './../../../../../utils/utils';

import styles from './feed-statuses.module.css';

import { useAppSelector } from '../../../../../hooks/rtk-hooks';
import { IFeed } from '../../../../../services/reducers/ws-feeds/types';
import { selectFeedsPending, selectFeedsReady } from '../../../../../services/selectors';

const FeedStatuses: FC = () => {
  const feedsReady = useAppSelector(selectFeedsReady);
  const feedsPending = useAppSelector(selectFeedsPending);

  const feedsReadyCols = sliceArraySection<IFeed>(feedsReady, 10);
  const feedsProgressCols = sliceArraySection<IFeed>(feedsPending, 10);

  return (
    <div className={styles['feed-statuses']}>
      <div className={styles['ready-feeds']}>
        <header className='text text_type_main-medium'>Готовы:</header>
        <div className={styles['feed-numbers']}>
          {feedsReadyCols.map((feedReadyCol, index) => (
            <div key={index} className={styles['feed-numbers-col']}>
              {feedReadyCol.map((feedReady, index) => (
                <span key={index} className='text text_type_digits-default'>
                  {feedReady.number}
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
                  {feedProgress.number}
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
