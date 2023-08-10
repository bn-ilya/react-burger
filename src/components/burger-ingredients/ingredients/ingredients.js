import styles from './ingredients.module.css';
import IngredientCart from './ingredient-cart/ingredient-cart';
import PropTypes from 'prop-types';
import { ingredientType, modalControlsType } from '../../../utils/types';

export default function Ingredients({ingredientsData, modalControls}) {

    const categories = [
        { name:'Булки', type: 'bun', ingredients: ingredientsData.filter(ingredient => ingredient.type === "bun") },
        { name: 'Соусы', type: 'sauce', ingredients: ingredientsData.filter(ingredient => ingredient.type === "sauce") },
        { name: 'Начинки', type: 'main', ingredients: ingredientsData.filter(ingredient => ingredient.type === "main") }
    ]

    return (
        <div className={styles.content}>
            {categories.map(({name, type, ingredients }) => (
                <div key={type} id={type} >
                    <h2 className='text text_type_main-medium mb-6'>
                        {name}
                    </h2>
                    <div className={styles.ingredientsRow + ' pl-4 pr-2'}>
                        {ingredients.map(ingredient => (
                            <IngredientCart
                                key={ingredient['_id']}
                                ingredient={ingredient}
                                modalControls={modalControls}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

Ingredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType),
    modalControls: modalControlsType
}