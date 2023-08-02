import React from 'react';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader/>
      <AppMain/>
    </div>
  );
}

export default App;
