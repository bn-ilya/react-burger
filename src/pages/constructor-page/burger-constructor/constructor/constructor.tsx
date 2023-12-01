import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';

import { FC, useEffect } from 'react';

import { useDrop } from 'react-dnd/dist/hooks/useDrop';

import ConstructorElementMock from './constructor-element-mock/constructor-element-mock';
import styles from './constructor.module.css';

import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';

import { useAppDispatch, useAppSelector } from '../../../../hooks/rtk-hooks';
import {
  setCountIngredients,
  setCountBuns,
} from '../../../../services/reducers/ingredients/ingredients';
import {
  addIngredients,
  setBunBottom,
  setBunTop,
  updateIndexIngredients,
} from '../../../../services/reducers/ingredients-constructor/ingredients-constructor';

import { setTotalPrice } from '../../../../services/reducers/total-price/total-price';
import { selectAllIngredientsConstructor } from '../../../../services/selectors';
import { IIngredient, IIngredientsCount } from '../../../../utils/types';

const Constructor: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients, bunTop, bunBottom } = useAppSelector(selectAllIngredientsConstructor);

  useEffect(() => {
    if (!ingredients) return;
    const ingredientsCount: IIngredientsCount = {};
    ingredients.forEach((ingredient) => {
      ingredientsCount[ingredient['_id']] = (ingredientsCount[ingredient['_id']] ?? 0) + 1;
    });
    dispatch(setCountIngredients(ingredientsCount));
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (!bunTop || !bunBottom) return;

    const bunsCount: IIngredientsCount = {};
    bunsCount[bunTop['_id']] = (bunsCount[bunTop['_id']] ?? 0) + 1;
    bunsCount[bunBottom['_id']] = (bunsCount[bunBottom['_id']] ?? 0) + 1;

    dispatch(setCountBuns(bunsCount));
  }, [bunTop, bunBottom, dispatch]);

  const onDropHandler = (ingredient: IIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch(setBunTop(ingredient));
      dispatch(setBunBottom(ingredient));
    } else {
      dispatch(addIngredients(ingredient));
      dispatch(updateIndexIngredients());
    }
  };

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop({ ingredient }: { ingredient: IIngredient }) {
      onDropHandler(ingredient);
    },
  });

  useEffect(() => {
    const totalBuns = bunTop && bunBottom ? bunTop.price + bunBottom.price : 0;
    const totalIngredients = ingredients.length
      ? ingredients.reduce((acc, ingredient) => {
          return (acc += ingredient.price);
        }, 0)
      : 0;
    const total = totalBuns + totalIngredients;
    dispatch(setTotalPrice(total));
  }, [ingredients, bunTop, bunBottom, dispatch]);

  return (
    <div className={styles.content} ref={dropRef} data-cy='drop-zone-ingredient'>
      <div className={styles.header}>
        {bunTop ? (
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bunTop.name + ' (верх)'}
            price={bunTop.price}
            thumbnail={bunTop.image}
            data-cy='bun-top-constructor'
          />
        ) : (
          <ConstructorElementMock direction='top' text={'Переместите булку'} />
        )}
      </div>
      <div className={`${styles.elements} ${!ingredients.length && styles['elements-empty']}`}>
        {ingredients.length ? (
          ingredients.map((ingredient, index) => (
            <DraggableConstructorElement
              index={index}
              key={ingredient.uniqueId}
              ingredient={ingredient}
            />
          ))
        ) : (
          <span className='text text_type_main-default text_color_inactive'>
            Переместите ингредиенты
          </span>
        )}
      </div>
      <div className={styles.footer}>
        {bunBottom ? (
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bunBottom.name + ' (низ)'}
            price={bunBottom.price}
            thumbnail={bunBottom.image}
          />
        ) : (
          <ConstructorElementMock direction='bottom' text={'Переместите булку'} />
        )}
      </div>
    </div>
  );
};

export default Constructor;
