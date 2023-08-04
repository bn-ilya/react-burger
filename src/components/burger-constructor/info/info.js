import styled from './info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/button';

export default function Info() {
    return (
        <div className={styled.content}>
            <div className={styled.price}>
                <span className='text text_type_digits-medium'>610</span>
                <CurrencyIcon />
            </div>
            <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>

        </div>
    )
}