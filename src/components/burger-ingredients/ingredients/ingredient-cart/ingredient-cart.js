import styles from './ingredient-cart.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';

export default function IngredientCart({ ingredient, modalControls }) {

    const handlerClick = () => {
        modalControls.setContentModal({
            header: <span className='text text_type_main-large'>Детали ингредиента</span>,
            main: <IngredientDetails
                    image={ingredient.image_large}
                    name={ingredient.name}
                    calories={ingredient.calories}
                    proteins={ingredient.proteins}
                    fat={ingredient.fat}
                    carbohydrates={ingredient.carbohydrates}
                 />
        })
        modalControls.setIsVisibleModal(true)
    }

    return (
        <article onClick={handlerClick} className={styles.cart}>
            {ingredient.count && (<Counter count={ingredient.count} />)}
            <div className={styles.image + ' pl-4 pr-4 mb-1'}>
                <img alt={ingredient.name} src={ingredient.image}></img>
            </div>
            <div className={styles.price + ' mb-1'}>
                <span className='text text_type_digits-default'>{ingredient.price}</span>
                <CurrencyIcon />
            </div>
            <h2 className={styles.name + ' text text_type_main-default'}>
                {ingredient.name}
            </h2>
        </article>
    )
}

IngredientCart.propTypes = {
    count: PropTypes.number,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}
