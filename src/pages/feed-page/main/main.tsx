import { FC, useEffect } from 'react';

import FeedInfo from './feed-info/feed-info';

import FeedList from './feed-list/feed-list';

import styles from './main.module.css';

import { useAppDispatch, useAppSelector } from '../../../hooks/rtk-hooks';
import { getIngredients } from '../../../services/reducers/ingredients';
import { wsInit } from '../../../services/reducers/ws-feeds/ws-feeds';
import { selectFeeds, selectIngredients } from '../../../services/selectors';

const Main: FC = () => {
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector(selectIngredients);
  const feeds = useAppSelector(selectFeeds);

  useEffect(() => {
    if (feeds.length) return;
    dispatch(wsInit());
  }, [dispatch, feeds]);

  useEffect(() => {
    if (ingredients.length) return;
    dispatch(getIngredients());
  }, [dispatch, ingredients]);

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
