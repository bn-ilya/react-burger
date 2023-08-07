import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';
import { useEffect, useState } from 'react';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

const URL_GET_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [isLoadIng, setIsLoading] = useState(true);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [contentModal, setContentModal] = useState({
    header: null,
    main: null
  })

  useEffect(() => {
    if (!isLoadIng) return;
    fetch(URL_GET_INGREDIENTS)
      .then(res => res.json())
      .then(data => {
        setIngredientsData(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsErrorLoading(true);
      })
  }, [isLoadIng])

  if (isLoadIng) return (<Loading />);
  if (isErrorLoading) return (<ErrorRequest onClick={() => setIsLoading(true)} />);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <AppMain ingredientsData={ingredientsData} setIsVisibleModal={param => setIsVisibleModal(param)} setContentModal={(param) => setContentModal(param)} />
      </div>

      {isVisibleModal && <Modal {...contentModal} closeModal={() => setIsVisibleModal(false)}></Modal>}
    </>
  );
}

export default App;
