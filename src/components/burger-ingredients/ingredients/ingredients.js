import styles from './ingredients.module.css';
import IngredientCart from './ingredient-cart/ingredient-cart';
import {modalControlsType } from '../../../utils/types';
import { useContext } from 'react';
import { IngredientsContext } from '../../../services/ingredients-context';

export default function Ingredients({ modalControls }) {

    const { stateIngredients } = useContext(IngredientsContext);

    const categories = [
        { name: 'Булки', type: 'bun', ingredients: stateIngredients.ingredients.filter(ingredient => ingredient.type === "bun") },
        { name: 'Соусы', type: 'sauce', ingredients: stateIngredients.ingredients.filter(ingredient => ingredient.type === "sauce") },
        { name: 'Начинки', type: 'main', ingredients: stateIngredients.ingredients.filter(ingredient => ingredient.type === "main") }
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
    modalControls: modalControlsType
}