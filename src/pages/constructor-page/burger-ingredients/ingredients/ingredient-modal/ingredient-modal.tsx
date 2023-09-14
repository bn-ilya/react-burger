import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { openModal } from '../../../../../services/reducers/modal';
import { selectIngredientById } from '../../../../../services/selectors';

export default function IngredientModal() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredient = useSelector(selectIngredientById(id));

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
