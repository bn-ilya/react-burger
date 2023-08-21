
import styles from './burger-ingredients.module.css';
import Ingredients from './ingredients/ingredients';
import Tabs from './tabs/tabs';
import {useRef, useEffect} from 'react';

export default function BurgerIngredients() {

    // const ingredientsContainer = useRef(null);

    // useEffect(() => {
    //     console.log(ingredientsContainer)
    //     const scrollHandler = () => {
    //         console.log(ingredientsContainer)
    //     }
    //     ingredientsContainer.current.addEventListener('scroll', scrollHandler)

    //     return () => {
    //         ingredientsContainer.current.removeEventListener('scroll', scrollHandler)
    //     }

    // }, [])

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
