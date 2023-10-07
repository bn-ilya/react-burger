import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/rtk-hooks';
import { openModal } from '../../services/reducers/modal';
import { ETypesModal } from '../../utils/types';

export default function FeedModal() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(
      openModal({
        contentModal: 'тут должен быть объект с настройками заказа',
        typeModal: ETypesModal.VIEWING_FEED,
        goBack: true,
      }),
    );
  }, [dispatch]);
  return null;
}
