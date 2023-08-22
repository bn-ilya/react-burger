
import styles from './burger-ingredients.module.css';
import Ingredients from './ingredients/ingredients';
import Tabs from './tabs/tabs';

export default function BurgerIngredients() {

    return (
        <section className={styles.content + ' pt-10'} >
            <div className={styles.header}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <Tabs />
            </div>
            <Ingredients />
        </section>
    )
}
