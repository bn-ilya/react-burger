// Styles
import styles from './info.module.css';
// Components
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import BurgerSpinLoader from '../../ui/loaders/burger-spin-loader';
import OrderDetails from '../../order-details/order-details';
import ModalError from '../../ui/modal-error/modal-error';
// Types
import { modalControlsType } from '../../../utils/types';
// Hooks
import { useContext, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
// Actions
import { createOrder } from '../../../services/reducers/orders';

export default function Info() {

    const dispatch = useDispatch();
    const {ingredients, bunTop, bunBottom} = useSelector(state => state.ingredientsConstructor)
    const orderRequest = useSelector(state => state.orders.orderRequest)
    const totalPrice = useSelector(state => state.totalPrice.totalPrice);

    const handleClick = () => {
        const ids = [bunTop?.['_id'], bunBottom?.['_id'], ...ingredients.map(topping => topping['_id'])]

        dispatch(createOrder(ids))
        if (!ids) return;
    }

    return (
        <div className={styles.content}>
            <div className={styles.price}>
                <span className='text text_type_digits-medium'>{totalPrice}</span>
                <CurrencyIcon />
            </div>
            <Button disabled={orderRequest} loop={true} extraClass={styles.loaderBtn} onClick={handleClick} htmlType="button" type="primary" size="large">
                {orderRequest && <BurgerSpinLoader type='secondary' />}
                <span>Оформить заказ</span>
            </Button>

        </div>
    )
}

Info.propTypes = {
    modalControls: modalControlsType
}

