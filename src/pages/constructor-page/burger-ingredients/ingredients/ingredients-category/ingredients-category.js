import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import styles from './ingredients-category.module.css';

import { ingredientType } from '../../../../../utils/types';
import IngredientCart from '../ingredient-cart/ingredient-cart';

const IngredientsCategory = forwardRef(
  function IngredientsCategory(props, ref) {
    return (
      <div>
        <h2 id={props.id} ref={ref} className='text text_type_main-medium mb-6'>
          {props.name}
        </h2>
        <div className={styles.ingredientsRow + ' pl-4 pr-2'}>
          {props.ingredients.map((ingredient) => (
            <IngredientCart key={ingredient['_id']} ingredient={ingredient} />
          ))}
        </div>
      </div>
    );
  },
);

export default IngredientsCategory;

IngredientsCategory.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  id: PropTypes.string.isRequired,
};
