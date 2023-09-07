import { openModal } from "../../../../../services/reducers/modal";
import { useParams } from "react-router-dom";
import { selectIngredientById } from "../../../../../services/selectors";
import { useSelector, useDispatch } from "react-redux";

export default function IngredientModal() {
    const dispatch = useDispatch();
    const {ingredientId} = useParams();
    const ingredient = useSelector(selectIngredientById(ingredientId));

    dispatch(openModal({ content: ingredient, type: 'viewingIngredient' })) 
    return null;
}