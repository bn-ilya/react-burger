import styles from './ingredients.module.css';
import IngredientsCategory from './ingredients-category/ingredients-category';
import { setActiveTab } from '../../../services/reducers/tabs';

// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';

export default function Ingredients() {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients.ingredients);

    const titleBuns = useRef();
    const titleSauces = useRef();
    const titleMains = useRef();

    const scrollHandler = (e) => {
        const containerPosition = e.target.getBoundingClientRect().top
        const titlesPositions = [
            { element: titleBuns, value: titleBuns.current.getBoundingClientRect().top },
            { element: titleSauces, value: titleSauces.current.getBoundingClientRect().top },
            { element: titleMains, value: titleMains.current.getBoundingClientRect().top }
        ]
        let closest = titlesPositions.reduce(function (prev, curr) {
            return (Math.abs(curr.value - containerPosition) < Math.abs(prev.value - containerPosition) ? curr : prev);
        });

        dispatch(setActiveTab(closest.element.current.getAttribute('id')))
    }

    if (!ingredients.length) return;

    const buns = ingredients.filter(ingredient => ingredient.type === "bun")
    const sauces = ingredients.filter(ingredient => ingredient.type === "sauce")
    const mains = ingredients.filter(ingredient => ingredient.type === "main")

    return (
        <div className={styles.main} onScroll={scrollHandler}>
            <div className={styles.content}>
                <IngredientsCategory ref={titleBuns} name='Булки' id='bun' ingredients={buns} />
                <IngredientsCategory ref={titleSauces} name='Соусы' id='sauce' ingredients={sauces} />
                <IngredientsCategory ref={titleMains} name='Начинки' id='main' ingredients={mains} />
            </div>
        </div>
    )
}