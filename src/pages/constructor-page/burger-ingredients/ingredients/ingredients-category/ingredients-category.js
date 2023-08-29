import styles from './ingredients-category.module.css';
import IngredientCart from '../ingredient-cart/ingredient-cart';
import { forwardRef } from 'react';
import { ingredientType } from '../../../../../utils/types';
import PropTypes from 'prop-types';

const IngredientsCategory = forwardRef((props, ref) => {
    return (
        <div >
            <h2 id={props.id} ref={ref} className='text text_type_main-medium mb-6'>
                {props.name}
            </h2>
            <div className={styles.ingredientsRow + ' pl-4 pr-2'}>
                {props.ingredients.map(ingredient => (
                    <IngredientCart
                        key={ingredient['_id']}
                        ingredient={ingredient}
                    />
                ))}
            </div>
        </div>
    )
})

export default IngredientsCategory

IngredientsCategory.propTypes = {
    name: PropTypes.string.isRequired,
    ingredients:  PropTypes.arrayOf(ingredientType)
}