import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styled from './draggable-constructor-element.module.css';
import PropTypes from 'prop-types';

export default function DraggableConstructorElement({topping}) {
    return (
        <div className={styled.dragElement}>
            <DragIcon/>
            <ConstructorElement text={topping.name} thumbnail={topping.image} price={topping.price} />
        </div>
    )
}

DraggableConstructorElement.propTypes = {
    topping: PropTypes.string
}
