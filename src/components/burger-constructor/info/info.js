import styles from './info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import OrderDetails from '../../order-details/order-details';
import ModalError from '../../ui/modal-error/modal-error';
import { modalControlsType } from '../../../utils/types';
import { useContext, useState } from 'react';
import { TotalPriceContext } from '../../../services/total-price-context';
import { OrderContext } from '../../../services/orders-context';
import { createOrder } from '../../../utils/burger-api';
import { ConstructorIngredientsContext } from '../../../services/constructor-ingredients-context';
import { ADD_ORDER } from '../../../actions/orders-actions';
import BurgerSpinLoader from '../../ui/loaders/burger-spin-loader';

export default function Info({ modalControls }) {

    const { stateConstructorIngredients } = useContext(ConstructorIngredientsContext);
    const [isCreateOrder, setIsCreateOrder] = useState(false);

    const { stateTotalPrice } = useContext(TotalPriceContext);
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
                <span className='text text_type_digits-medium'>{stateTotalPrice}</span>
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

