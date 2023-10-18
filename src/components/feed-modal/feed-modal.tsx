import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { openModal } from '../../services/reducers/modal';
import { IFeed } from '../../services/reducers/ws-feeds/types';
import { selectFeedById } from '../../services/selectors';
import { ETypesModal } from '../../utils/types';

export default function FeedModal() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const feed = useAppSelector(selectFeedById(id as IFeed['_id']));

  useEffect(() => {
    if (!feed) return;
    dispatch(
      openModal({
        contentModal: feed,
        typeModal: ETypesModal.VIEWING_FEED,
        goBack: true,
      }),
    );
  }, [dispatch]);
  return null;
}
