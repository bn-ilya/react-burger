import styles from './ingredient-details.module.css';

export default function IngredientDetails({ image, name, calories, proteins, fat, carbohydrates }) {
    return (
        <div className={styles.content}>
            <div className={styles.previewContainer}>
                <img alt={name} className={styles.preview} src={image}/>
            </div>
            <span className='text text_type_main-medium mb-8'>{name}</span>
            <div className={styles.properties}>
                <div className={styles.property}>
                    <span className='text text_type_main-default text_color_inactive'>Калории,ккал</span>
                    <span className='text text_type_digits-default text_color_inactive'>{calories}</span>
                </div>
                <div className={styles.property}>
                    <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{proteins}</span>
                </div>
                <div className={styles.property}>
                    <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{fat}</span>
                </div>
                <div className={styles.property}>
                    <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
                    <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}