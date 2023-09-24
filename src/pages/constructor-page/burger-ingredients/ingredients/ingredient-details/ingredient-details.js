import styles from './ingredient-details.module.css';
import { ingredientType } from '../../../../../utils/types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setViewingIngredient, clearViewingIngredient } from '../../../../../services/reducers/viewing-ingredient';

export default function IngredientDetails({ ingredient }) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setViewingIngredient(ingredient));

        return () => {
            dispatch(clearViewingIngredient());
        }
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
                    <span className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</span>
                </div>
                <div className={styles.property}>
                    <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</span>
                </div>
                <div className={styles.property}>
                    <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</span>
                </div>
                <div className={styles.property}>
                    <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientType
}
