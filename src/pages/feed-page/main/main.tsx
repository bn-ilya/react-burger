import { FC } from 'react';

import FeedInfo from './feed-info/feed-info';

import FeedList from './feed-list/feed-list';

import styles from './main.module.css';

const Main: FC = () => {
  return (
    <div className={styles.content}>
      <FeedList />
      <FeedInfo />
    </div>
  );
};

export default Main;
