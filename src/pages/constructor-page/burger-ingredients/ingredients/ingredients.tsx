import { useRef, FC, UIEvent, RefObject } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/rtk-hooks';

import IngredientsCategory from './ingredients-category/ingredients-category';
import styles from './ingredients.module.css';

import { selectActiveTab } from '../../../../services/selectors';

import { setActiveTab } from '../../../../services/reducers/tabs';
import { ITitles } from './ingredients-props';

const getTitleData = (ref: RefObject<HTMLHeadingElement>): ITitles | null => {
  const node = ref.current;
  if (!node) return null;
  const topPosition = node.getBoundingClientRect().top;
  return {
    node,
    topPosition
  }
}

const Ingredients: FC = () => {
  const dispatch = useAppDispatch();

  const titleBuns = useRef<HTMLHeadingElement>(null);
  const titleSauces = useRef<HTMLHeadingElement>(null);
  const titleMains = useRef<HTMLHeadingElement>(null);

  const activeTab = useAppSelector(selectActiveTab);

  const scrollHandler = (e: UIEvent<HTMLElement>) => {
    const containerNode: HTMLElement = e.currentTarget;
    const containerTop: number = containerNode.getBoundingClientRect().top;
    
    const titleBunsData = getTitleData(titleBuns);
    const titleSaucesData = getTitleData(titleSauces);
    const titleMainsData = getTitleData(titleMains);

    if (!titleBunsData || !titleSaucesData || !titleMainsData) return null;

    const titles: Array<ITitles> = [titleBunsData, titleSaucesData, titleMainsData];

    const {node: closestTitleNode} = titles.reduce((prev: ITitles, curr: ITitles): ITitles => {
      return Math.abs(curr.topPosition - containerTop) < Math.abs(prev.topPosition - containerTop)
        ? curr
        : prev;
    });

    if (!closestTitleNode) return;
    const closestTitleId: string | null = closestTitleNode.getAttribute('id');

    if (!closestTitleId) return;
    activeTab !== closestTitleId && dispatch(setActiveTab(closestTitleId));
  };

  const { buns, sauces, mains } = useAppSelector((state) => state.ingredients);

  return (
    <div className={styles.main} onScroll={scrollHandler}>
      <div className={styles.content}>
        <IngredientsCategory ref={titleBuns} name='Булки' id='bun' ingredients={buns} />
        <IngredientsCategory ref={titleSauces} name='Соусы' id='sauce' ingredients={sauces} />
        <IngredientsCategory ref={titleMains} name='Начинки' id='main' ingredients={mains} />
      </div>
    </div>
  );
}

export default Ingredients;