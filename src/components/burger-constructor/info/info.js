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
import {useSelector} from 'react-redux';
// Contexts
import { OrderContext } from '../../../services/orders-context';
import { ConstructorIngredientsContext } from '../../../services/constructor-ingredients-context';
// API
import { createOrder } from '../../../utils/burger-api';
// Actions
import { ADD_ORDER } from '../../../actions/orders-actions';

export default function Info({ modalControls }) {

    const { stateConstructorIngredients } = useContext(ConstructorIngredientsContext);
    const [isCreateOrder, setIsCreateOrder] = useState(false);
    const totalPrice = useSelector(state => state.totalPrice.totalPrice);
    
    const { dispatcherOrders } = useContext(OrderContext);

    const handleClick = () => {

        //Сомневаюсь: Нормально ли использовать такие конструкции?
        const { bunTop, bunBottom, toppings } = stateConstructorIngredients.constructorIngredients || {};
        const ids = [bunTop?.['_id'], bunBottom?.['_id'], ...toppings.map(topping => topping['_id'])]

        if (!ids) return;

        setIsCreateOrder(true);

        createOrder(ids)
            .then(data => {
                dispatcherOrders({
                    type: ADD_ORDER,
                    payload: data
                })

                modalControls.setContentModal({
                    main: <OrderDetails number={data.order.number} />
                })
                modalControls.openModal(true);
            })
            .catch(data => {
                modalControls.setContentModal({
                    main: <ModalError error={data.message} />
                })
                modalControls.openModal(true);
            })
            .finally(() => {
                setIsCreateOrder(false);
            })
    }

    return (
        <div className={styles.content}>
            <div className={styles.price}>
                <span className='text text_type_digits-medium'>{totalPrice}</span>
                <CurrencyIcon />
            </div>
            <Button disabled={isCreateOrder} loop={true} extraClass={styles.loaderBtn} onClick={handleClick} htmlType="button" type="primary" size="large">
                {isCreateOrder && <BurgerSpinLoader type='secondary' />}
                <span>Оформить заказ</span>
            </Button>

        </div>
    )
}

Info.propTypes = {
    modalControls: modalControlsType
}

