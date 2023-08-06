import React from 'react';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';
import ingredientsData from '../../utils/data';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';


function App() {

  return (
    <div className={styles.app}>
      <AppHeader/>
      <AppMain ingredientsData={ingredientsData}/>
    </div>
  );
}

export default App;
