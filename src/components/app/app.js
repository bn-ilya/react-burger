import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';
import { useEffect, useState } from 'react';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

const URL_GET_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [isLoadIng, setIsLoading] = useState(true);
  const [isErrorLoading, setIsErrorLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(URL_GET_INGREDIENTS)
      .then(res => res.json())
      .then(data => {
        setIngredientsData(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsErrorLoading(true);
      })
  }, [])

  return (
    <div className={styles.app}>
      {!isLoadIng && (
        <>
          <AppHeader />
          {!isErrorLoading ? (<AppMain ingredientsData={ingredientsData} />) : (<p>'Произошла ошибка запроса...'</p>)}
        </>
      )}
    </div>
  );
}

export default App;
