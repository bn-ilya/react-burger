import { FC } from 'react';

import FeedHeader from './feed-header/feed-header';
import FeedInfo from './feed-info/feed-info';
import FeedStructure from './feed-structure/feed-structure';

import styles from './main.module.css';

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.body}>
          <FeedHeader />
          <FeedStructure />
          <FeedInfo />
        </div>
      </div>
    </div>
  );
};

export default Main;
