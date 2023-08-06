import styles from './burger-ingredients.module.css';
import Ingredients from './ingredients/ingredients';
import Tabs from './tabs/tabs';
import PropTypes from 'prop-types';

export default function BurgerIngredients({ingredientsData}) {
    return (
        <section className={styles.content + ' pt-10'}>
            <div className={styles.header}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <Tabs />
            </div>
            <div className={styles.main}>
                <Ingredients ingredientsData={ingredientsData} />
            </div>
        </section>
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

BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientDataTypes)
}