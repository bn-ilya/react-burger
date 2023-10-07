import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './feed-info.module.css';

const FeedInfo = () => {
  return (
    <div className={styles.info}>
      <span className='text text_type_main-default text_color_inactive'>Вчера, 13:50</span>
      <span className={styles['total-price']}>
        <span className='text text_type_digits-default'>510</span>
        <CurrencyIcon type='primary' />
      </span>
    </div>
  );
};

export default FeedInfo;
