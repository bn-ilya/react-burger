import { FC, useEffect } from 'react';

import { useAppDispatch } from './../../../../../hooks/rtk-hooks';
import { IIngredientsDetails } from './ingredient-details-props';
import styles from './ingredient-details.module.css';

import {
  setViewingIngredient,
  clearViewingIngredient,
} from '../../../../../services/reducers/viewing-ingredient/viewing-ingredient';

const IngredientDetails: FC<IIngredientsDetails> = ({ ingredient }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setViewingIngredient(ingredient));

    return () => {
      dispatch(clearViewingIngredient());
    };
  }, [dispatch, ingredient]);

  return (
    <div className={styles.content}>
      <div className={styles.previewContainer}>
        <img alt={ingredient.name} className={styles.preview} src={ingredient.image_large} />
      </div>
      <span className='text text_type_main-medium mb-8'>{ingredient.name}</span>
      <div className={styles.properties}>
        <div className={styles.property}>
          <span className='text text_type_main-default text_color_inactive'>Калории,ккал</span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.calories}
          </span>
        </div>
        <div className={styles.property}>
          <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.proteins}
          </span>
        </div>
        <div className={styles.property}>
          <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.fat}
          </span>
        </div>
        <div className={styles.property}>
          <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
          <span className='text text_type_digits-default text_color_inactive'>
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
