import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);

  useEffect(()=>{
    fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(res => res.json())
    .then(data => setIngredientsData(data.data))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader/>
      {ingredientsData && <AppMain ingredientsData={ingredientsData}/>}
    </div>
  );
}

export default App;
