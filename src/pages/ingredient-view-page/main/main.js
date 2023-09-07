import IngredientDetails from "../../constructor-page/burger-ingredients/ingredients/ingredient-details/ingredient-details"
import styles from './main.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIngredientById } from "../../../services/selectors";

export default function Main() {
    const { id } = useParams();
    const ingredient = useSelector(selectIngredientById(id));

    return (
        <div className={styles.content}>
            <IngredientDetails ingredient={ingredient} />
        </div>
    )
}