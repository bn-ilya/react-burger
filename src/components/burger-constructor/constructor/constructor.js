import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import styles from './constructor.module.css';
// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTotalPrice } from '../../../services/reducers/total-price';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { addIngredients } from '../../../services/reducers/ingredients-constructor';
import { incrementCount, setCountIngredients } from '../../../services/reducers/ingredients';
import { setBunBottom, setBunTop } from '../../../services/reducers/ingredients-constructor';


export default function Constructor() {
    const dispatch = useDispatch();
    const { ingredients, bunTop, bunBottom } = useSelector(state => state.ingredientsConstructor);
    const buns = useSelector(state => state.ingredients.buns);

    useEffect(() => {
        const bun = buns[0];

        if (bun) {
            dispatch(setBunTop(bun));
            dispatch(setBunBottom(bun));
        }
    }, [])

    const onDropHandler = ({ ingredient }) => {
        if (ingredient.type === 'bun') {
            dispatch(setBunTop(ingredient));
            dispatch(setBunBottom(ingredient));
        } else {
            dispatch(addIngredients(ingredient))
        }
    }

    useEffect(() => {
        if (!ingredients) return;
        const ingredientsCount = {}
        ingredients.forEach(ingredient => {
            ingredientsCount[ingredient['_id']] = {
                count: (ingredientsCount[ingredient['_id']]?.count ?? 0) + 1,
                type: ingredient.type
            }
        })
        dispatch(setCountIngredients(ingredientsCount))
    }, [ingredients])

    useEffect(() => {
        if (!bunTop || !bunBottom) return;

        const bunsCount = {};
        bunsCount[bunTop['_id']] = {
            count: (bunsCount[bunTop['_id']]?.count ?? 0) + 1,
            type: bunTop.type
        }
        bunsCount[bunBottom['_id']] = {
            count: (bunsCount[bunBottom['_id']]?.count ?? 0) + 1,
            type: bunBottom.type
        }
        dispatch(setCountIngredients(bunsCount))
    }, [bunTop, bunBottom])

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            onDropHandler(ingredient)
        }
    })

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
            <div className={styles.elements} ref={dropRef}>
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
