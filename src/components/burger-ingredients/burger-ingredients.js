import { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab'
import Ingredients from '../ingredients/ingredients';

function Tabs() {
    const [current, setCurrent] = useState('Булки');
    return (
        <div className={styles.tabs}>
            <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

export default function BurgerIngredients(props) {
    return (
        <section className={styles.content + ' pt-10 ' + props.classes}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <Tabs />
            <Ingredients/>
        </section>
    )
}