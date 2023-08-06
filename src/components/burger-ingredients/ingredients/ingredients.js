import styles from './ingredients.module.css';
import IngredientCart from './ingredient-cart/ingredient-cart';
import PropTypes from 'prop-types';

export default function Ingredients({ingredientsData}) {

    const categories = [
        { type: 'Булки', ingredients: ingredientsData.filter(ingredient => ingredient.type === "bun") },
        { type: 'Соусы', ingredients: ingredientsData.filter(ingredient => ingredient.type === "sauce") },
        { type: 'Начинки', ingredients: ingredientsData.filter(ingredient => ingredient.type === "main") }
    ]

    return (
        <div className={styles.content}>
            {categories.map(({ type, ingredients }) => (
                <div key={type} >
                    <h2 className='text text_type_main-medium mb-6'>
                        {type}
                    </h2>
                    <div className={styles.ingredientsRow + ' pl-4 pr-2'}>
                        {ingredients.map(ingredient => (
                            <IngredientCart key={ingredient['_id']} count={ingredient.count} name={ingredient.name} price={ingredient.price} picture={ingredient.image} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

const ingredientDataTypes = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    '__v': PropTypes.number.isRequired

})

Ingredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientDataTypes)
}