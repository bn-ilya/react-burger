import { FC } from 'react';

import { IFeedDetailsProps } from './feed-details-props';

import styles from './feed-details.module.css';

import FeedHeader from './feed-header/feed-header';
import FeedInfo from './feed-info/feed-info';
import FeedStructure from './feed-structure/feed-structure';

const FeedDetails: FC<IFeedDetailsProps> = ({ showNumberFeed }) => {
  return (
    <div className={styles['feed-details']}>
      <FeedHeader showNumberFeed={showNumberFeed} />
      <FeedStructure />
      <FeedInfo />
    </div>
  );
};

export default FeedDetails;
