import { FC } from 'react';

import styles from './main.module.css';

import FeedDetails from '../../../components/feed-details/feed-details';

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.body}>
          <FeedDetails />
        </div>
      </div>
    </div>
  );
};

export default Main;
