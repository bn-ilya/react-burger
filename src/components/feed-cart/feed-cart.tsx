import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { TFeedCartProps } from './feed-cart-props';

import styles from './feed-cart.module.css';

const FeedCart: FC<TFeedCartProps> = ({
  ingredients,
  _id,
  status,
  name,
  number,
  createdAt,
  updatedAt,
}) => {
  const location = useLocation();

  return (
    <Link to={`${location?.pathname}/${_id}`} state={{ background: location }}>
      <article className={styles.cart}>
        <header className={styles['cart-header']}>
          <span className='text text_type_digits-default'>#{number}</span>
          <span className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(createdAt)} />
          </span>
        </header>
        <div className={styles['cart-body']}>
          <span className='text text_type_main-medium'>{name}</span>
          <span className='text text_type_main-default'>{status}</span>
        </div>
        <footer className={styles['cart-footer']}>
          <div className={styles['cart-ingredients']}>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                style={{ zIndex: ingredients.length - index }}
                className={styles['cart-ingredient']}
              >
                <img src={ingredient} alt='' />
              </div>
            ))}
          </div>
          <div className={styles['cart-price']}>
            <span className='text text_type_digits-default'>480</span>
            <CurrencyIcon type='primary' />
          </div>
        </footer>
      </article>
    </Link>
  );
};

export default FeedCart;
