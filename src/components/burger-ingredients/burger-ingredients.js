import styles from './burger-ingredients.module.css';

export default function BurgerIngredients(props) {
    return(
        <section className={styles.content + ' pt-10 ' + props.classes}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
        </section>
    )
}