import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { TFeedCartProps } from './feed-cart-props';

import styles from './feed-cart.module.css';

import { useAppSelector } from '../../hooks/rtk-hooks';
import { selectImagesIngredients, selectTotalPriceFeeds } from '../../services/selectors';
import { OrderStatus } from '../order-status/order-status';

const FeedCart: FC<TFeedCartProps> = ({ ingredients, _id, status, name, number, createdAt }) => {
  const location = useLocation();
  const ingredientsImages = useAppSelector(selectImagesIngredients(ingredients));
  const total = useAppSelector(selectTotalPriceFeeds(ingredients));

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
          <OrderStatus status={status} />
        </div>
        <footer className={styles['cart-footer']}>
          <div className={styles['cart-ingredients']}>
            {ingredientsImages.map((ingredientImage, index) => {
              if (index < 5) {
                return (
                  <div
                    key={index}
                    style={{ zIndex: ingredients.length - index }}
                    className={styles['cart-ingredient']}
                  >
                    <img src={ingredientImage} alt='Ингредиент' />
                  </div>
                );
              } else if (index === 5) {
                return (
                  <div
                    key={index}
                    style={{ zIndex: ingredients.length - index }}
                    className={`${styles['cart-ingredient']}`}
                  >
                    <div className={`${styles['remain-number']} text text_type_main-default`}>
                      +{ingredientsImages.length - index}
                    </div>
                    <img src={ingredientImage} alt='Ингредиент' />
                  </div>
                );
              } else {
                return;
              }
            })}
          </div>
          <div className={styles['cart-price']}>
            <span className='text text_type_digits-default'>{total}</span>
            <CurrencyIcon type='primary' />
          </div>
        </footer>
      </article>
    </Link>
  );
};

export default FeedCart;
