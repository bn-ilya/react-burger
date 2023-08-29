import styles from './ingredients.module.css';
import IngredientsCategory from './ingredients-category/ingredients-category';
import { setActiveTab } from '../../../../services/reducers/tabs';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';

export default function Ingredients() {
    const dispatch = useDispatch();

    const titleBuns = useRef();
    const titleSauces = useRef();
    const titleMains = useRef();

    const activeTab = useSelector(state => state.tabs.activeTab);

    const scrollHandler = (e) => {
        const containerPosition = e.target.getBoundingClientRect().top
        const titlesPositions = [
            { element: titleBuns, value: titleBuns.current.getBoundingClientRect().top },
            { element: titleSauces, value: titleSauces.current.getBoundingClientRect().top },
            { element: titleMains, value: titleMains.current.getBoundingClientRect().top }
        ]
        let closestTitle = titlesPositions.reduce(function (prev, curr) {
            return (Math.abs(curr.value - containerPosition) < Math.abs(prev.value - containerPosition) ? curr : prev);
        });

        const closestTab = closestTitle.element.current.getAttribute('id')
        activeTab !== closestTab && dispatch(setActiveTab(closestTab))
    }

    const {buns, sauces, mains} = useSelector(state => state.ingredients);

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