import styles from './burger-constructor.module.css';
import Constructor from './constructor/constructor';
import Info from './info/info';
import PropTypes from 'prop-types';

export default function BurgerConstructor({ingredientsData}) {
    return (
        <section className={styles.content}>
            <div className={styles.main}>
                <Constructor ingredientsData={ingredientsData} />
            </div>
            <div className={styles.footer}>
                <Info />
            </div>
        </section>
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

BurgerConstructor.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientDataTypes)
}