import styles from './burger-ingredients.module.css';
import Ingredients from './ingredients/ingredients';
import Tabs from './tabs/tabs';
import PropTypes from 'prop-types';
import { ingredientType, modalControlsType } from '../../utils/types';

export default function BurgerIngredients({ ingredientsData, modalControls }) {
    return (
        <section className={styles.content + ' pt-10'}>
            <div className={styles.header}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <Tabs />
            </div>
            <div className={styles.main}>
                <Ingredients ingredientsData={ingredientsData} modalControls={modalControls} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType),
    modalControls: modalControlsType
}