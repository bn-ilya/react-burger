import styled from './info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import OrderDetails from '../../order-details/order-details';
import ModalError from '../../ui/modal-error/modal-error';
import { modalControlsType } from '../../../utils/types';
import { useContext } from 'react';
import { TotalPriceContext } from '../../../services/total-price-context';
import { OrderContext } from '../../../services/orders-context';
import { createOrder } from '../../../utils/burger-api';

export default function Info({ constructorIngredients, modalControls }) {

    const { stateTotalPrice } = useContext(TotalPriceContext);
    const { dispatcherOrders } = useContext(OrderContext);

    const handleClick = () => {

        const { bunTop, bunBottom, toppings } = constructorIngredients || {};
        const ids = [bunTop?.['_id'], bunBottom?.['_id'], ...toppings.map(topping => topping['_id'])]

        if (!ids) return;

        createOrder(ids)
            .then(data => {
                dispatcherOrders({
                    type: "ADD_ORDER",
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
    }

    return (
        <div className={styled.content}>
            <div className={styled.price}>
                <span className='text text_type_digits-medium'>{stateTotalPrice}</span>
                <CurrencyIcon />
            </div>
            <Button onClick={handleClick} htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>

        </div>
    )
}

Info.propTypes = {
    modalControls: modalControlsType
}

