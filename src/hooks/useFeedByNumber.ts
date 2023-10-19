import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './rtk-hooks';

import { IFeed } from '../services/reducers/ws-feeds/types';
import { getFeedByNumber } from '../services/reducers/ws-feeds/ws-feeds';
import { selectFeedByNumber } from '../services/selectors';

export const useFeedByNumber = (number: IFeed['number']) => {
  const feed = useAppSelector(selectFeedByNumber(number));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (feed) return;
    dispatch(getFeedByNumber(number));
  }, [feed]);

  return feed;
};
