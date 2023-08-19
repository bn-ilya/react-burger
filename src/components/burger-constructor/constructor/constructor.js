import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import styles from './constructor.module.css';
// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTotalPrice } from '../../../services/reducers/total-price';

export default function Constructor() {
    const dispatch = useDispatch();
    const { ingredients, bunTop, bunBottom } = useSelector(state => state.ingredientsConstructor);

    // Подсчёт общей стоимости
    useEffect(() => {
        const totalBuns = bunTop && bunBottom ? bunTop.price + bunBottom.price : 0
        const totalIngredients = ingredients.length ? ingredients.reduce((acc, ingredient) => {
            return acc += ingredient.price
        }, 0) : 0
        const total = totalBuns + totalIngredients
        dispatch(setTotalPrice(total));
    }, [ingredients, bunTop, bunBottom, dispatch])

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                {bunTop && (<ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bunTop.name + ' (верх)'}
                    price={bunTop.price}
                    thumbnail={bunTop.image}
                />)}
            </div>
            <div className={styles.elements}>
                {ingredients && ingredients.map(ingredient => <DraggableConstructorElement key={ingredient['_id']} ingredient={ingredient} />)}
            </div>
            <div className={styles.footer}>
                {bunBottom && (<ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bunBottom.name + ' (низ)'}
                    price={bunBottom.price}
                    thumbnail={bunBottom.image}
                />)}
            </div>
        </div>
    )
}
