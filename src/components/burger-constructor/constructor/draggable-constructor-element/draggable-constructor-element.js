import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styled from './draggable-constructor-element.module.css';
import { ingredientType } from '../../../../utils/types';

export default function DraggableConstructorElement({ingredient}) {
    return (
        <div className={styled.dragElement}>
            <DragIcon/>
            <ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} />
        </div>
    )
}

DraggableConstructorElement.propTypes = {
    ingredient: ingredientType
}
