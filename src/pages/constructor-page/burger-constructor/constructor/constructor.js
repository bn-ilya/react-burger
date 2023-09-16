import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';

import { useEffect } from 'react';

import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { useSelector, useDispatch } from 'react-redux';

import styles from './constructor.module.css';

import DraggableConstructorElement from './draggable-constructor-element/draggable-constructor-element';

import { setCountIngredients, setCountBuns } from '../../../../services/reducers/ingredients';
import {
  addIngredients,
  setBunBottom,
  setBunTop,
  updateIndexIngredients,
} from '../../../../services/reducers/ingredients-constructor';

import { setTotalPrice } from '../../../../services/reducers/total-price';

export default function Constructor() {
  const dispatch = useDispatch();
  const { ingredients, bunTop, bunBottom } = useSelector((state) => state.ingredientsConstructor);
  const buns = useSelector((state) => state.ingredients.buns);

  useEffect(() => {
    const bun = buns[0];

    if (bun) {
      dispatch(setBunTop(bun));
      dispatch(setBunBottom(bun));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients) return;
    const ingredientsCount = {};
    ingredients.forEach((ingredient) => {
      ingredientsCount[ingredient['_id']] = (ingredientsCount[ingredient['_id']] ?? 0) + 1;
    });
    dispatch(setCountIngredients(ingredientsCount));
  }, [ingredients, dispatch]);

  useEffect(() => {
    if (!bunTop || !bunBottom) return;

    const bunsCount = {};
    bunsCount[bunTop['_id']] = (bunsCount[bunTop['_id']] ?? 0) + 1;
    bunsCount[bunBottom['_id']] = (bunsCount[bunBottom['_id']] ?? 0) + 1;

    dispatch(setCountBuns(bunsCount));
  }, [bunTop, bunBottom, dispatch]);

  const onDropHandler = ({ ingredient }) => {
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
    drop(ingredient) {
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
    <div className={styles.content}>
      <div className={styles.header}>
        {bunTop && (
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bunTop.name + ' (верх)'}
            price={bunTop.price}
            thumbnail={bunTop.image}
          />
        )}
      </div>
      <div className={styles.elements} ref={dropRef}>
        {ingredients &&
          ingredients.map((ingredient, index) => (
            <DraggableConstructorElement
              index={index}
              key={ingredient.uniqueId}
              ingredient={ingredient}
            />
          ))}
      </div>
      <div className={styles.footer}>
        {bunBottom && (
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bunBottom.name + ' (низ)'}
            price={bunBottom.price}
            thumbnail={bunBottom.image}
          />
        )}
      </div>
    </div>
  );
}
