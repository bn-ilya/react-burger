import { FC } from 'react';

import styles from './feed-list.module.css';

import ErrorRequestPage from '../../../../components/error-request-page/error-request-page';
import FeedCart from '../../../../components/feed-cart/feed-cart';
import LoadingPage from '../../../../components/loading-page/loading-page';
import { useAppSelector } from '../../../../hooks/rtk-hooks';
import {
  selectFeeds,
  selectIngredientsFailed,
  selectIngredientsRequest,
  selectWsFeedsConnected,
} from '../../../../services/selectors';

const FeedList: FC = () => {
  const feeds = useAppSelector(selectFeeds);

  const isFetchIngredients = useAppSelector(selectIngredientsRequest);
  const isFailedIngredients = useAppSelector(selectIngredientsFailed);
  const isWsFeedsConnected = useAppSelector(selectWsFeedsConnected);

  if (isFetchIngredients || !isWsFeedsConnected) return <LoadingPage />;
  if (isFailedIngredients) return <ErrorRequestPage />;

  return (
    <div className={styles.content}>
      {feeds.map((feed) => (
        <FeedCart key={feed._id} {...feed} />
      ))}
    </div>
  );
};

export default FeedList;
