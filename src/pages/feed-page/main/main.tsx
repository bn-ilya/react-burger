import { FC, useEffect } from 'react';

import FeedInfo from './feed-info/feed-info';

import FeedList from './feed-list/feed-list';

import styles from './main.module.css';

import { useAppDispatch } from '../../../hooks/rtk-hooks';
import { useIngredients } from '../../../hooks/useIngredients';
import { wsInit } from '../../../services/reducers/ws-feeds/ws-feeds';

const Main: FC = () => {
  const dispatch = useAppDispatch();
  useIngredients();

  useEffect(() => {
    dispatch(wsInit());
  }, [dispatch]);

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
