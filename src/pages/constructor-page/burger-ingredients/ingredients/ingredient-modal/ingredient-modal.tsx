import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/rtk-hooks';

import { openModal } from '../../../../../services/reducers/modal/modal';
import { selectIngredientById } from '../../../../../services/selectors';
import { ETypesModal } from '../../../../../utils/types';

export default function IngredientModal() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const ingredient = useAppSelector(selectIngredientById(id));

  useEffect(() => {
    ingredient &&
      dispatch(
        openModal({
          contentModal: ingredient,
          typeModal: ETypesModal.VIEWING_INGREDIENTS,
          goBack: true,
        }),
      );
  }, [ingredient, dispatch]);
  return null;
}
