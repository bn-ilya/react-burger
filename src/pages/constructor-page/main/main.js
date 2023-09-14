// Styles
// Components
import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './main.module.css';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

export default function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </main>
  );
}
