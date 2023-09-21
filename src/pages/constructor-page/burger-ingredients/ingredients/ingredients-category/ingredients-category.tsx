import { forwardRef } from 'react';

import { IIngredientsCategory } from './ingredients-category-props';

import styles from './ingredients-category.module.css';

import IngredientCart from '../ingredient-cart/ingredient-cart';

const IngredientsCategory = forwardRef<HTMLHeadingElement, IIngredientsCategory>(
  function IngredientsCategory({ id, name, ingredients }, ref) {
    return (
      <div>
        <h2 id={id} ref={ref} className='text text_type_main-medium mb-6'>
          {name}
        </h2>
        <div className={styles.ingredientsRow + ' pl-4 pr-2'}>
          {ingredients.map((ingredient) => (
            <IngredientCart key={ingredient['_id']} ingredient={ingredient} />
          ))}
        </div>
      </div>
    );
  },
);

export default IngredientsCategory;
