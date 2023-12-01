import Tab from './tab/tab';

import styles from './tabs.module.css';

import { useAppSelector, useAppDispatch } from '../../../../hooks/rtk-hooks';
import { setActiveTab } from '../../../../services/reducers/tabs/tabs';
import { selectActiveTab } from '../../../../services/selectors';

import { EIngredients } from '../../../../utils/types';

export default function Tabs() {
  const activeTab = useAppSelector(selectActiveTab);
  const dispatch = useAppDispatch();

  function handleClickTab(tab: EIngredients): void {
    dispatch(setActiveTab);
    const element = document.getElementById(tab);
    element && element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.tabs}>
      <Tab
        value={EIngredients.BUN}
        active={activeTab === EIngredients.BUN}
        onClick={handleClickTab}
      >
        Булки
      </Tab>
      <Tab
        value={EIngredients.SAUCE}
        active={activeTab === EIngredients.SAUCE}
        onClick={handleClickTab}
      >
        Соусы
      </Tab>
      <Tab
        value={EIngredients.MAIN}
        active={activeTab === EIngredients.MAIN}
        onClick={handleClickTab}
      >
        Начинки
      </Tab>
    </div>
  );
}
