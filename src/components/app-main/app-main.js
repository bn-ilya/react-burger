// Styles
import styles from './app-main.module.css';
// Components
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function AppMain() {

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </main>
    )
}
