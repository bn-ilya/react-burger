import styles from './burger-constructor.module.css';
import Constructor from './constructor/constructor';
import Info from './info/info';
import PropTypes from 'prop-types';
import { ingredientType, modalControlsType } from '../../utils/types';
import { ConstructorIngredients } from '../../services/constructor-ingredients-context';
import { useContext } from 'react';

export default function BurgerConstructor({ modalControls }) {
    
    const {constructorIngredients} = useContext(ConstructorIngredients)

    return (
        <section className={styles.content}>
            <div className={styles.main}>
               <Constructor constructorIngredients={constructorIngredients} />
            </div>
            <div className={styles.footer}>
                <Info modalControls={modalControls} />
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType),
    modalControls: modalControlsType
}
