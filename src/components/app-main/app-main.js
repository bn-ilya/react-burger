import styles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';

export default function AppMain({ingredientsData}) {
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <BurgerIngredients ingredientsData={ingredientsData}/>
                <BurgerConstructor ingredientsData={ingredientsData}/>
            </div>
        </main>
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

AppMain.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientDataTypes)
}