import styles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function AppMain(props) {
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <BurgerIngredients classes="mr-10"/>
                <BurgerConstructor/>
            </div>
        </main>
    )
}