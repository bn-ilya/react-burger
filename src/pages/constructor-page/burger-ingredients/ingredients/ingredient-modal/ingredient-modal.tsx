import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/rtk-hooks';

import { openModal } from '../../../../../services/reducers/modal';
import { selectIngredientById } from '../../../../../services/selectors';

export default function IngredientModal() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const ingredient = useAppSelector(selectIngredientById(id));

  useEffect(() => {
    ingredient &&
      dispatch(
        openModal({
          content: ingredient,
          type: 'viewingIngredient',
          goBack: true,
        }),
      );
  }, [ingredient, dispatch]);
  return null;
}
