import styles from './ingredients.module.css';
import IngredientCart from '../ingredient-cart/ingredient-cart';
import ingredientData from '../../utils/data.js';

export default function Ingredients() {

    const categories = [
        { type: 'Булки', ingredients: ingredientData.filter(ingredient => ingredient.type === "bun") },
        { type: 'Соусы', ingredients: ingredientData.filter(ingredient => ingredient.type === "sauce") },
        { type: 'Начинки', ingredients: ingredientData.filter(ingredient => ingredient.type === "main") }
    ]

    return (
        <div className={styles.content + ' pt-10'}>
            {categories.map(({ type, ingredients }) => (
                <>
                    <h2 className='text text_type_main-medium mb-6'>
                        {type}
                    </h2>
                    <div className={styles.ingredientsRow + ' pl-4 pr-4'}>
                        {ingredients.map(ingredient => (
                            <IngredientCart count={ingredient.count} name={ingredient.name} price={ingredient.price} picture={ingredient.image} />
                        ))}
                    </div>
                </>
            ))}
        </div>
    )
}