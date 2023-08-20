import styles from './ingredients.module.css';
import IngredientCart from './ingredient-cart/ingredient-cart';
// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// Actions
import { getIngredients } from '../../../services/reducers/ingredients';
import { addingredients, setBunBottom, setBunTop } from '../../../services/reducers/ingredients-constructor';

export default function Ingredients() {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients.ingredients);

    useEffect(() => {
        if (!ingredients.length) dispatch(getIngredients())
    }, [dispatch, ingredients])

    useEffect(() => {
        if (ingredients.length) {
            const bun = ingredients.find(ingredient => ingredient.type === 'bun');
            const toppings = ingredients.filter(ingredient => ingredient.type !== 'bun');

            dispatch(addingredients(toppings));
            dispatch(setBunTop(bun));
            dispatch(setBunBottom(bun));
        }
    }, [ingredients, dispatch]);

    if (!ingredients.length) return false;

    const categories = [
        { name: 'Булки', type: 'bun', ingredients: ingredients.filter(ingredient => ingredient.type === "bun") },
        { name: 'Соусы', type: 'sauce', ingredients: ingredients.filter(ingredient => ingredient.type === "sauce") },
        { name: 'Начинки', type: 'main', ingredients: ingredients.filter(ingredient => ingredient.type === "main") }
    ]

    return (
        <div className={styles.content}>
            {categories.map(({ name, type, ingredients }) => (
                <div key={type} id={type} >
                    <h2 className='text text_type_main-medium mb-6'>
                        {name}
                    </h2>
                    <div className={styles.ingredientsRow + ' pl-4 pr-2'}>
                        {ingredients.map(ingredient => (
                            <IngredientCart
                                key={ingredient['_id']}
                                ingredient={ingredient}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}