import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';

import styles from './tabs.module.css';

import { useAppSelector, useAppDispatch } from '../../../../hooks/rtk-hooks';
import { setActiveTab } from '../../../../services/reducers/tabs';
import { selectActiveTab } from '../../../../services/selectors';
import Ingredients from './../ingredients/ingredients';
 
type TIngredientsTypes = 'bun' | 'sauce' | 'main' ;

export default function Tabs() {
  const activeTab = useAppSelector(selectActiveTab);
  const dispatch = useAppDispatch();

  function handleClickTab(tab: TIngredientsTypes) :void {
    dispatch(setActiveTab);
    const element = document.getElementById(tab);
    element && element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.tabs}>
      <Tab value='bun' active={activeTab === 'bun'} onClick={(value: string) => handleClickTab(value as TIngredientsTypes)}>
        Булки
      </Tab>
      <Tab value='sauce' active={activeTab === 'sauce'} onClick={(value: string) => handleClickTab(value as TIngredientsTypes)}>
        Соусы
      </Tab>
      <Tab value='main' active={activeTab === 'main'} onClick={(value: string) => handleClickTab(value as TIngredientsTypes)}>
        Начинки
      </Tab>
    </div>
  );
}
