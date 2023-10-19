import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './rtk-hooks';

import { getFeedByNumber } from '../services/reducers/ws-feeds/ws-feeds';
import { selectFeedByNumber } from '../services/selectors';
import { IOrder } from '../utils/types';

export const useFeedByNumber = (number: IOrder['number']) => {
  const feed = useAppSelector(selectFeedByNumber(number));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (feed) return;
    dispatch(getFeedByNumber(number));
  }, [feed]);

  return feed;
};
