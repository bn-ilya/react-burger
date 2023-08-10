import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';
import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { IngredientsContext } from '../../services/ingredients-context';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { getIngredients } from '../../utils/burger-api';

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [isLoadIng, setIsLoading] = useState(true);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [contentModal, setContentModal] = useState({
    header: null,
    main: null
  })

  useEffect(() => {
    if (!isLoadIng) return;
    getIngredients()
      .then(setIngredientsData)
      .catch(() => {
        setIsErrorLoading(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [isLoadIng])

  const modalControls = {
    openModal,
    setContentModal: params => setContentModal(params)
  }

  if (isLoadIng) return (<Loading />);
  if (isErrorLoading) return (<ErrorRequest onClick={() => setIsLoading(true)} />);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <IngredientsContext.Provider value={{ ingredientsData }}>
          <AppMain modalControls={modalControls} ingredientsData={ingredientsData} />
        </IngredientsContext.Provider>
      </div>

      {isModalOpen && <Modal header={contentModal?.header} closeModal={closeModal}>{contentModal.main}</Modal>}
    </>
  );
}

export default App;
