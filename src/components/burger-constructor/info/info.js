import styled from './info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';
import OrderDetails from '../../order-details/order-details';
import { modalControlsType } from '../../../utils/types';
import {useContext} from 'react';
import { TotalPriceContext } from '../../../services/total-price-context';

export default function Info({modalControls}) {

    const {stateTotalPrice} = useContext(TotalPriceContext);

    const handleClick = () => {
        modalControls.setContentModal({
            main: <OrderDetails/>
        })
        modalControls.openModal(true);
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

