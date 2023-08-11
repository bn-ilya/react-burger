import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import styles from './app.module.css';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';
import { useEffect, useReducer, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { ConstructorIngredients } from '../../services/constructor-ingredients-context';
import { TotalPriceContext } from '../../services/total-price-context';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { getIngredients } from '../../utils/burger-api';

const initialTotalPrice = 0;

const reducerTotalPrice = (state, action) => {
  switch (action.type) {
    case "SET_TOTAL_PRICE":
      return (action.payload);
    default:
      return state;
  }
}

function App() {
  const [ingredientsData, setIngredientsData] = useState(null);
  const [constructorIngredients, setConstructorIngredients] = useState(null);
  const [isLoadIng, setIsLoading] = useState(true);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [contentModal, setContentModal] = useState({
    header: null,
    main: null
  })
  const [stateTotalPrice, dispatcherTotalPrice] = useReducer(reducerTotalPrice, initialTotalPrice);

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

  useEffect(() => {
    if (ingredientsData) {
      const bun = ingredientsData.find(ingredient => ingredient.type === 'bun');

      const toppings = ingredientsData.filter(ingredient => ingredient.type !== 'bun');

      setConstructorIngredients({ bunTop: bun, bunBottom: bun, toppings: toppings });
    }
  }, [ingredientsData, setConstructorIngredients]);

  const modalControls = {
    openModal,
    setContentModal: params => setContentModal(params)
  }

  useEffect(() => {

    if (!constructorIngredients) return;
    const totalBuns = constructorIngredients.bunTop.price + constructorIngredients.bunBottom.price
    const totalToppings = constructorIngredients.toppings.reduce((acc, topping) => {
      return acc += topping.price
    }, 0)
    const total = totalBuns + totalToppings

    console.log(total)

    dispatcherTotalPrice({
      type: "SET_TOTAL_PRICE",
      payload: total
    })
  }, [constructorIngredients])

  if (isLoadIng) return (<Loading />);
  if (isErrorLoading) return (<ErrorRequest onClick={() => setIsLoading(true)} />);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <ConstructorIngredients.Provider value={{ constructorIngredients }}>
          <TotalPriceContext.Provider value={{ stateTotalPrice }}>
            <AppMain modalControls={modalControls} ingredientsData={ingredientsData} />
          </TotalPriceContext.Provider>
        </ConstructorIngredients.Provider>
      </div>

      {isModalOpen && <Modal header={contentModal?.header} closeModal={closeModal}>{contentModal.main}</Modal>}
    </>
  );
}

export default App;
