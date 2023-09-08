import { openModal } from "../../../../../services/reducers/modal";
import { useParams } from "react-router-dom";
import { selectIngredientById } from "../../../../../services/selectors";
import { useSelector, useDispatch } from "react-redux";
import {useEffect} from "react";

export default function IngredientModal() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const ingredient = useSelector(selectIngredientById(id));

    useEffect(()=>{
        ingredient &&
        dispatch(openModal({ content: ingredient, type: 'viewingIngredient', goBack: true })) 
    }, [ingredient, dispatch])
    return null;
}