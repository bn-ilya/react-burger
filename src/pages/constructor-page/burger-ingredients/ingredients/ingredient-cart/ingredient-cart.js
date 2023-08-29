import styles from './ingredient-cart.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter';
import { ingredientType } from '../../../../../utils/types';
import { openModal } from '../../../../../services/reducers/modal';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';

export default function IngredientCart({ ingredient }) {

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: { ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    const dispatch = useDispatch();
    const handlerClick = () => {
        dispatch(openModal({ content: ingredient, type: 'viewingIngredient' }))
    }

    const opacity = isDrag ? 0.5 : 1;

    return (
         <article onClick={handlerClick} style={{opacity: opacity}} className={styles.cart} ref={dragRef}>
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
    ingredient: ingredientType
}
