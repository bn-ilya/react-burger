import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './main.module.css';

import { selectIngredientById } from '../../../services/selectors';
import IngredientDetails from '../../constructor-page/burger-ingredients/ingredients/ingredient-details/ingredient-details';

export default function Main() {
  const { id } = useParams();
  const ingredient = useSelector(selectIngredientById(id));

  return (
    <div className={styles.content}>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
}
