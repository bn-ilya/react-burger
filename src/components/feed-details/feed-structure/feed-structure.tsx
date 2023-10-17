import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

import FeedStructureProps from './feed-structure-props';

import styles from './feed-structure.module.css';

const FeedStructure: FC<FeedStructureProps> = ({ ingredientsId }) => {
  return (
    <div className={styles.structure}>
      <span className='text text_type_main-medium'>Состав:</span>
      <div className={styles['structure-list']}>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
        <article className={styles['ingredient']}>
          <div className={styles['ingredient-left']}>
            <div className={styles['ingredient-pic']}>
              <img src='https://code.s3.yandex.net/react/code/sauce-01.png' alt='Привет' />
            </div>
            <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          </div>
          <div className={styles['ingredient-right']}>
            <span className='text text_type_digits-default'>2 x 20</span>
            <CurrencyIcon type='primary' />
          </div>
        </article>
      </div>
    </div>
  );
};

export default FeedStructure;
