import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './feed-cart.module.css';

const ingredients = [
  'https://code.s3.yandex.net/react/code/bun-01.png',
  'https://code.s3.yandex.net/react/code/sauce-02.png',
  'https://code.s3.yandex.net/react/code/sauce-01.png',
];

const FeedCart: FC = () => {
  const location = useLocation();

  return (
    <Link to={`${location?.pathname}/1`} state={{ background: location }}>
      <article className={styles.cart}>
        <header className={styles['cart-header']}>
          <span className='text text_type_digits-default'>#034535</span>
          <span className='text text_type_main-default text_color_inactive'>Сегодня, 16:20</span>
        </header>
        <div className={styles['cart-body']}>
          <span className='text text_type_main-medium'>Death Star Starship Main бургер</span>
          <span className='text text_type_main-default'>Создан</span>
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
