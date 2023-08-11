
import styles from './burger-ingredients.module.css';
import Ingredients from './ingredients/ingredients';
import Tabs from './tabs/tabs';
import { modalControlsType } from '../../utils/types';

export default function BurgerIngredients({ modalControls }) {

    return (
        <section className={styles.content + ' pt-10'}>
            <div className={styles.header}>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <Tabs />
            </div>
            <div className={styles.main}>
                <Ingredients modalControls={modalControls} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    modalControls: modalControlsType
}