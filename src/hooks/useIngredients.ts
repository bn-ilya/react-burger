import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './rtk-hooks';

import { getIngredients } from '../services/reducers/ingredients';
import { selectIngredients } from '../services/selectors';

export const useIngredients = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);

  useEffect(() => {
    if (ingredients.length) return;
    dispatch(getIngredients());
  }, [dispatch, ingredients]);
};
