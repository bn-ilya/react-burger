import styles from './burger-constructor.module.css';
import Constructor from './constructor/constructor';
import Info from './info/info';
import PropTypes from 'prop-types';
import { ingredientType, modalControlsType } from '../../utils/types';
import { IngredientsContext } from '../../services/ingredients-context';
import { useContext } from 'react';

export default function BurgerConstructor({ modalControls }) {
    
    const {ingredientsData} = useContext(IngredientsContext)
    
    return (
        <section className={styles.content}>
            <div className={styles.main}>
                <Constructor ingredientsData={ingredientsData} />
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
