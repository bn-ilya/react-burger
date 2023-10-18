import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

import FeedStructureProps from './feed-structure-props';

import styles from './feed-structure.module.css';

import { useAppSelector } from '../../../hooks/rtk-hooks';
import { useFilteredIngredients } from '../../../hooks/useFilteredIngredients';
import { selectIngredientsByIds } from '../../../services/selectors';

const FeedStructure: FC<FeedStructureProps> = ({ ingredientsId }) => {
  const ingredients = useAppSelector(selectIngredientsByIds(ingredientsId));
  const filteredIngredients = useFilteredIngredients(ingredients);

  return (
    <div className={styles.structure}>
      <span className='text text_type_main-medium'>Состав:</span>
      <div className={styles['structure-list']}>
        {filteredIngredients.map((ingredient) => (
          <article key={ingredient._id} className={styles['ingredient']}>
            <div className={styles['ingredient-left']}>
              <div className={styles['ingredient-pic']}>
                <img src={ingredient.image} alt='Привет' />
              </div>
              <span className='text text_type_main-default'>{ingredient.name}</span>
            </div>
            <div className={styles['ingredient-right']}>
              <span className='text text_type_digits-default'>
                {ingredient.count} x {ingredient.price}
              </span>
              <CurrencyIcon type='primary' />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeedStructure;
