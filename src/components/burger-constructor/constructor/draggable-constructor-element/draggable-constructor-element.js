import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styled from './draggable-constructor-element.module.css';
import { ingredientType } from '../../../../utils/types';
import {useDispatch} from 'react-redux';
import { removeIngredient } from '../../../../services/reducers/ingredients-constructor';

export default function DraggableConstructorElement({ingredient}) {
    const dispatch = useDispatch();
    
    const handleClose = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(removeIngredient(ingredient.sort))
    }

    return (
        <div className={styled.dragElement}>
            <DragIcon/>
            <ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} handleClose={handleClose} />
        </div>
    )
}

DraggableConstructorElement.propTypes = {
    ingredient: ingredientType
}
