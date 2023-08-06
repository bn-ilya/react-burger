import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';
import styles from './constructor.module.css';
import PropTypes from 'prop-types';

export default function Constructor({ ingredientsData }) {

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
                {ingredientsData.map(ingredientData => (
                    <DraggableConstructorElement
                        extraClass='pr-8'
                        text={ingredientData.name}
                        price={ingredientData.price}
                        thumbnail={ingredientData.image}
                        key={ingredientData['_id']}
                    />
                ))}
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

const ingredientDataTypes = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    '__v': PropTypes.number.isRequired

})

Constructor.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientDataTypes)
}