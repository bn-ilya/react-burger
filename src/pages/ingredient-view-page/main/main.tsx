import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import styles from './main.module.css';

import { useAppSelector } from '../../../hooks/rtk-hooks';
import { selectIngredientById } from '../../../services/selectors';
import { ERoutes } from '../../../utils/types';
import IngredientDetails from '../../constructor-page/burger-ingredients/ingredients/ingredient-details/ingredient-details';

const Main: FC = () => {
  const { id } = useParams();
  const ingredient = useAppSelector(selectIngredientById(id));

  return ingredient ? (
    <div className={styles.content}>
      <IngredientDetails ingredient={ingredient} />
    </div>
  ) : (
    <Navigate to={ERoutes.all} />
  );
};

export default Main;
