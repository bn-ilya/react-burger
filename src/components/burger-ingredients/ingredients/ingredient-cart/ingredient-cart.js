import styles from './ingredient-cart.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter';

export default function IngredientCart(props) {
    return (
        <article className={styles.cart}>
            {props.count &&  (<Counter count={props.count} />)}
            <div className={styles.image + ' pl-4 pr-4 mb-1'}>
                <img alt={props.name} src={props.picture}></img>
            </div>
            <div className={styles.price + ' mb-1'}>
                <span className='text text_type_digits-default'>{props.price}</span>
                <CurrencyIcon />
            </div>
            <h2 className={styles.name + ' text text_type_main-default'}>
                {props.name}
            </h2>
        </article>
    )
}