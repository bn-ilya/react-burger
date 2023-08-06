import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styled from './draggable-constructor-element.module.css';
import PropTypes from 'prop-types';

export default function DraggableConstructorElement(props) {
    return (
        <div className={styled.dragElement}>
            <DragIcon/>
            <ConstructorElement {...props} />
        </div>
    )
}

DraggableConstructorElement.propTypes = {
    extraClass: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string
}
