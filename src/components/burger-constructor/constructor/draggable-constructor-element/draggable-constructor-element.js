import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styled from './draggable-constructor-element.module.css';

export default function DraggableConstructorElement(props) {
    return (
        <div className={styled.dragElement}>
            <DragIcon/>
            <ConstructorElement {...props} />
        </div>
    )
}