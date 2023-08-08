import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';
import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';

const URL_GET_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [isLoadIng, setIsLoading] = useState(true);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const {isModalOpen, openModal, closeModal} = useModal(false);
  const [contentModal, setContentModal] = useState({
    header: null,
    main: null
  })

  useEffect(() => {
    if (!isLoadIng) return;
    fetch(URL_GET_INGREDIENTS)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json()
      })
      .then(data => {
        setIngredientsData(data.data);
      })
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
        <AppMain ingredientsData={ingredientsData} modalControls={modalControls} />
      </div>

      {isModalOpen && <Modal header={contentModal?.header} closeModal={closeModal}>{contentModal.main}</Modal>}
    </>
  );
}

export default App;
