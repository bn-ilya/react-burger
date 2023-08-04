import styles from './ingredients.module.css';
import IngredientCart from './ingredient-cart/ingredient-cart';
import ingredientData from '../../../utils/data';

export default function Ingredients() {

    const categories = [
        { type: 'Булки', ingredients: ingredientData.filter(ingredient => ingredient.type === "bun") },
        { type: 'Соусы', ingredients: ingredientData.filter(ingredient => ingredient.type === "sauce") },
        { type: 'Начинки', ingredients: ingredientData.filter(ingredient => ingredient.type === "main") }
    ]

    return (
        <div className={styles.content}>
            {categories.map(({ type, ingredients }) => (
                <div key={type} >
                    <h2 className='text text_type_main-medium mb-6'>
                        {type}
                    </h2>
                    <div className={styles.ingredientsRow + ' pl-4 pr-4'}>
                        {ingredients.map(ingredient => (
                            <IngredientCart key={ingredient['_id']} count={ingredient.count} name={ingredient.name} price={ingredient.price} picture={ingredient.image} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}