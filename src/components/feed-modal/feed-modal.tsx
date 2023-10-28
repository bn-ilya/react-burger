import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/rtk-hooks';
import { useFeedByNumber } from '../../hooks/useFeedByNumber';
import { openModal } from '../../services/reducers/modal/modal';
import { IOrder, ETypesModal, IRouteParams } from '../../utils/types';

export default function FeedModal() {
  const dispatch = useAppDispatch();
  const { number } = useParams<IRouteParams>();
  const feed = useFeedByNumber(Number(number) as IOrder['number']);

  useEffect(() => {
    if (!feed) return;
    dispatch(
      openModal({
        contentModal: feed,
        typeModal: ETypesModal.VIEWING_FEED,
        goBack: true,
      }),
    );
  }, [dispatch, feed]);
  return null;
}
