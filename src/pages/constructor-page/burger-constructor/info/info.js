import styles from './info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import BurgerSpinLoader from '../../../../components/ui/loaders/burger-spin-loader';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../../../services/reducers/orders';
import { openModal } from '../../../../services/reducers/modal';
import ButtonLoader from '../../../../components/button-loader/button-loader';

export default function Info() {

    const dispatch = useDispatch();
    const { ingredients, bunTop, bunBottom } = useSelector(state => state.ingredientsConstructor)
    const orderRequest = useSelector(state => state.orders.orderRequest)
    const totalPrice = useSelector(state => state.totalPrice.totalPrice);

    const handleClick = () => {
        const ids = [bunTop?.['_id'], bunBottom?.['_id'], ...ingredients.map(topping => topping['_id'])]

        dispatch(createOrder(ids))
            .unwrap()
            .then(res => {
                dispatch(openModal({ content: res.order.number, type: 'order' }))
            })
            .catch(error => {
                dispatch(openModal({ content: error.message, type: 'error' }))
            })
    }

    return (
        <div className={styles.content}>
            <div className={styles.price}>
                <span className='text text_type_digits-medium'>{totalPrice}</span>
                <CurrencyIcon />
            </div>
            <ButtonLoader load={orderRequest} loop={true} onClick={handleClick} htmlType="button" type="primary" size="large">
                <span>Оформить заказ</span>
            </ButtonLoader>
        </div>
    )
}

