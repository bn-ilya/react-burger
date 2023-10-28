import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { IDraggableConstructorElement } from './draggable-constructor-element-props';
import styled from './draggable-constructor-element.module.css';

import { useAppDispatch } from '../../../../../hooks/rtk-hooks';
import {
  moveIngredients,
  removeIngredient,
} from '../../../../../services/reducers/ingredients-constructor/ingredients-constructor';
import { IIngredientConstructor } from '../../../../../utils/types';

interface ICollectedProps {
  handlerId: string | symbol | null;
}

interface IDragObject {
  ingredient: IIngredientConstructor;
  index: number;
}

const DraggableConstructorElement: FC<IDraggableConstructorElement> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, dropRef] = useDrop<IDragObject, void, ICollectedProps>({
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
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;
      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        moveIngredients({
          dragIndex: dragIndex,
          hoverIndex: hoverIndex,
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

  const handleClose = () => {
    dispatch(removeIngredient(ingredient.uniqueId));
  };

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div className={styled.dragElement} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={handleClose}
      />
    </div>
  );
};

export default DraggableConstructorElement;
