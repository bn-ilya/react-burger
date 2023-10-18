import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

import { IFeedInfoProps } from './feed-info-props';

import styles from './feed-info.module.css';

import { useAppSelector } from '../../../hooks/rtk-hooks';
import { selectTotalPriceFeeds } from '../../../services/selectors';

const FeedInfo: FC<IFeedInfoProps> = ({ ingredients, createdAt }) => {
  const totalPrice = useAppSelector(selectTotalPriceFeeds(ingredients));

  return (
    <div className={styles.info}>
      <span className='text text_type_main-default text_color_inactive'>
        <FormattedDate date={new Date(createdAt)} />
      </span>
      <span className={styles['total-price']}>
        <span className='text text_type_digits-default'>{totalPrice}</span>
        <CurrencyIcon type='primary' />
      </span>
    </div>
  );
};

export default FeedInfo;
