import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import styles from './constructor.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

export default function Constructor({ ingredientsData }) {

    const burgerTopping = ingredientsData.filter(ingredient => ingredient.type !== 'bun');

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>
            <div className={styles.elements}>
                {burgerTopping.map(topping => <DraggableConstructorElement key={topping['_id']} topping={topping} />)}
            </div>
            <div className={styles.footer}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>
        </div>
    )
}

Constructor.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType)
}