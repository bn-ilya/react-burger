// Styles
import styles from './app-main.module.css';
// Components
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
// Types
import { modalControlsType } from '../../utils/types';

export default function AppMain({ modalControls }) {

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <BurgerIngredients modalControls={modalControls} />
                <BurgerConstructor modalControls={modalControls} />
            </div>
        </main>
    )
}

AppMain.propTypes = {
    modalControls: modalControlsType
}