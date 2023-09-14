import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import styles from './info.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import { openModal } from '../../../../services/reducers/modal';
import { createOrder } from '../../../../services/reducers/orders';
import { selectIsAuth } from '../../../../services/selectors';

export default function Info() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { ingredients, bunTop, bunBottom } = useSelector(
    (state) => state.ingredientsConstructor,
  );
  const orderRequest = useSelector((state) => state.orders.orderRequest);
  const totalPrice = useSelector((state) => state.totalPrice.totalPrice);
  const navigate = useNavigate();

  const handleClick = () => {
    const ids = [
      bunTop?.['_id'],
      bunBottom?.['_id'],
      ...ingredients.map((topping) => topping['_id']),
    ];
    if (!isAuth) {
      navigate('/login');
      return;
    }
    dispatch(createOrder(ids))
      .unwrap()
      .then((res) => {
        dispatch(openModal({ content: res.order.number, type: 'order' }));
      })
      .catch((error) => {
        dispatch(openModal({ content: error.message, type: 'error' }));
      });
  };

  return (
    <div className={styles.content}>
      <div className={styles.price}>
        <span className='text text_type_digits-medium'>{totalPrice}</span>
        <CurrencyIcon />
      </div>
      <ButtonLoader
        load={orderRequest}
        loop={true}
        onClick={handleClick}
        htmlType='button'
        type='primary'
        size='large'
      >
        <span>Оформить заказ</span>
      </ButtonLoader>
    </div>
  );
}
