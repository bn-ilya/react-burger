import styles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import { ingredientType, modalControlsType } from '../../utils/types';

export default function AppMain({ingredientsData, modalControls}) {
    
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <BurgerIngredients ingredientsData={ingredientsData} modalControls={modalControls}/>
                <BurgerConstructor ingredientsData={ingredientsData} modalControls={modalControls}/>
            </div>
        </main>
    )
}

AppMain.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType),
    modalControls: modalControlsType
}