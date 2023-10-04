import { FC } from 'react';

import FeedInfo from './feed-info/feed-info';

import FeedList from './feed-list/feed-list';

import styles from './main.module.css';

const Main: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className='text text_type_main-large'>Лента заказов</h1>
        </header>
        <div className={styles.body}>
          <FeedList />
          <FeedInfo />
        </div>
      </div>
    </div>
  );
};

export default Main;
