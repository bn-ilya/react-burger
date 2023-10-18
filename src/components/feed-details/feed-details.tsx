import { FC } from 'react';

import { IFeedDetailsProps } from './feed-details-props';

import styles from './feed-details.module.css';

import FeedHeader from './feed-header/feed-header';
import FeedInfo from './feed-info/feed-info';
import FeedStructure from './feed-structure/feed-structure';

const FeedDetails: FC<IFeedDetailsProps> = ({ showNumberFeed, order }) => {
  return (
    <div className={styles['feed-details']}>
      <FeedHeader
        name={order.name}
        number={order.number}
        status={order.status}
        showNumberFeed={showNumberFeed}
      />
      <FeedStructure ingredientsId={order.ingredients} />
      <FeedInfo createdAt={order.createdAt} ingredients={order.ingredients} />
    </div>
  );
};

export default FeedDetails;
