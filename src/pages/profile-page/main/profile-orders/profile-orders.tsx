import styles from './profile-orders.module.css';

import FeedCart from '../../../../components/feed-cart/feed-cart';

const ProfileOrders = () => {
  return (
    <div className={styles.content}>
      <FeedCart />
      <FeedCart />
      <FeedCart />
      <FeedCart />
      <FeedCart />
      <FeedCart />
    </div>
  );
};

export default ProfileOrders;
