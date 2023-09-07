import { openModal } from "../../../../../services/reducers/modal";
import { useParams } from "react-router-dom";
import { selectIngredientById } from "../../../../../services/selectors";
import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react";

export default function IngredientModal() {
    const dispatch = useDispatch();
    const {ingredientId} = useParams();
    const ingredient = useSelector(selectIngredientById(ingredientId));

    useEffect(()=>{
        ingredient &&
        dispatch(openModal({ content: ingredient, type: 'viewingIngredient' })) 
    }, [ingredient])
    return null;
}