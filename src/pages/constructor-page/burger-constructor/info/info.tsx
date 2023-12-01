import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './info.module.css';

import ButtonLoader from '../../../../components/button-loader/button-loader';
import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import { openModal } from '../../../../services/reducers/modal/modal';
import { createOrder } from '../../../../services/reducers/orders/orders';
import {
  selectAllIngredientsConstructor,
  selectIsAuth,
  selectOrderRequest,
  selectTotalPrice,
} from '../../../../services/selectors';
import { ETypesModal } from '../../../../utils/types';

const Info: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const { ingredients, bunTop, bunBottom } = useAppSelector(selectAllIngredientsConstructor);
  const orderRequest = useAppSelector(selectOrderRequest);
  const totalPrice = useAppSelector(selectTotalPrice);
  const navigate = useNavigate();

  const handleClick = (): void | null => {
    if (!bunTop || !bunBottom) return null;
    const ids: Array<string> = [
      bunTop['_id'],
      bunBottom['_id'],
      ...ingredients.map((topping) => topping['_id']),
    ];
    if (!isAuth) {
      navigate('/login');
      return;
    }
    dispatch(createOrder(ids))
      .unwrap()
      .then((res) => {
        dispatch(openModal({ contentModal: res.number, typeModal: ETypesModal.ORDER }));
      })
      .catch((error) => {
        dispatch(openModal({ contentModal: error.message, typeModal: ETypesModal.ERROR }));
      });
  };

  return (
    <div className={styles.content}>
      <div className={styles.price}>
        <span className='text text_type_digits-medium'>{totalPrice}</span>
        <CurrencyIcon type='primary' />
      </div>
      <ButtonLoader
        load={orderRequest}
        loop={true}
        onClick={handleClick}
        htmlType='button'
        type='primary'
        size='large'
        dataCy='btn-create-order'
      >
        <span>Оформить заказ</span>
      </ButtonLoader>
    </div>
  );
};

export default Info;
