import { useEffect } from 'react';

import styles from './profile-orders.module.css';

import FeedCart from '../../../../components/feed-cart/feed-cart';
import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import { useIngredients } from '../../../../hooks/useIngredients';
import { wsInit } from '../../../../services/reducers/ws-orders/ws-orders';
import { selectOrders } from '../../../../services/selectors';

const ProfileOrders = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  useIngredients();

  useEffect(() => {
    dispatch(wsInit());
  }, [dispatch]);

  return (
    <div className={styles.content}>
      {orders && orders.map((order) => <FeedCart key={order._id} {...order} />)}
    </div>
  );
};

export default ProfileOrders;
