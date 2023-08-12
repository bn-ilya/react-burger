import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import styles from './constructor.module.css';
import { ConstructorIngredientsContext } from '../../../services/constructor-ingredients-context';
import { useContext } from 'react';

export default function Constructor() {

    const {stateConstructorIngredients} = useContext(ConstructorIngredientsContext)
    
    const {bunTop, bunBottom, toppings} = stateConstructorIngredients.constructorIngredients || {};

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
                {toppings && toppings.map(topping => <DraggableConstructorElement key={topping['_id']} topping={topping} />)}
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
