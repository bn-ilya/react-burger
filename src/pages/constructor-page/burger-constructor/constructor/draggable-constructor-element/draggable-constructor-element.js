import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import styled from './draggable-constructor-element.module.css';

import {
  updateIndexIngredients,
  moveIngredients,
  removeIngredient,
} from '../../../../../services/reducers/ingredients-constructor';

export default function DraggableConstructorElement({ ingredient, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'ingredientsConstruct',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (ingredient, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = ingredient.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        moveIngredients({
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
          ingredient: ingredient.ingredient,
        }),
      );
      ingredient.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredientsConstruct',
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeIngredient(ingredient.uniqueId));
    dispatch(updateIndexIngredients());
  };

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div className={styled.dragElement} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={handleClose}
      />
    </div>
  );
}
