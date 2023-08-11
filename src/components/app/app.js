import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import styles from './app.module.css';
// Components
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';
// Hooks
import { useEffect, useReducer, useState } from 'react';
import { useModal } from '../../hooks/useModal';
// Contexts
import { ConstructorIngredientsContext } from '../../services/constructor-ingredients-context';
import { TotalPriceContext } from '../../services/total-price-context';
import { IngredientsContext } from '../../services/ingredients-context';
import { OrderContext } from '../../services/orders-context';
import { getIngredients } from '../../utils/burger-api';
// Reducers
import { reducerTotalPrice, initialTotalPrice } from '../../reducers/total-price-reducer';
import { reducerOrders, initialOrders } from '../../reducers/orders-reducer';
import { reducerIngredients, initialIngredients } from '../../reducers/ingredients-reducer';
import { reducerConstructorIngredients, initialConstructorIngredients } from '../../reducers/constructor-ingredients-reducer';

function App() {
  const [isLoadIng, setIsLoading] = useState(true);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const [contentModal, setContentModal] = useState({
    header: null,
    main: null
  })

  const [stateConstructorIngredients, dispatchConstructorIngredients] = useReducer(reducerConstructorIngredients, initialConstructorIngredients);
  const [stateIngredients, dispatcherIngredients] = useReducer(reducerIngredients, initialIngredients);
  const [stateOrders, dispatcherOrders] = useReducer(reducerOrders, initialOrders);
  const [stateTotalPrice, dispatcherTotalPrice] = useReducer(reducerTotalPrice, initialTotalPrice);

  useEffect(() => {
    if (!isLoadIng) return;
    getIngredients()
      .then(data => {
        dispatcherIngredients({
          type: 'SET_INGREDIENTS',
          payload: data
        }
        )
      })
      .catch(() => {
        setIsErrorLoading(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [isLoadIng])

  // Сомневаюсь: смущает то как я храню булки (то что вынес в отдельные свойсва), но лучше не придумал
  useEffect(() => {

    const ingredients = stateIngredients.ingredients
    
    if (ingredients) {
      const bun = ingredients.find(ingredient => ingredient.type === 'bun');
      const toppings = ingredients.filter(ingredient => ingredient.type !== 'bun');

      dispatchConstructorIngredients({
        type: 'SET_CONSTRUCTOR_INGREDIENTS',
        payload: { bunTop: bun, bunBottom: bun, toppings: toppings }
      });
    }
  }, [stateIngredients.ingredients, dispatchConstructorIngredients]);

  /*  Сомневаюсь: хочется вынести этот код по подсчёту тотальной
      стоимости в какое-то другое место, но не понимаю куда  */
  useEffect(() => {

    const constructorIngredients = stateConstructorIngredients.constructorIngredients

    if (!constructorIngredients) return;
    const totalBuns = constructorIngredients.bunTop.price + constructorIngredients.bunBottom.price
    const totalToppings = constructorIngredients.toppings.reduce((acc, topping) => {
      return acc += topping.price
    }, 0)
    const total = totalBuns + totalToppings

    dispatcherTotalPrice({
      type: "SET_TOTAL_PRICE",
      payload: total
    })
  }, [stateConstructorIngredients.constructorIngredients])

  if (isLoadIng) return (<Loading />);
  if (isErrorLoading) return (<ErrorRequest onClick={() => setIsLoading(true)} />);

  const modalControls = {
    openModal,
    setContentModal: params => setContentModal(params)
  }

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <ConstructorIngredientsContext.Provider value={{ stateConstructorIngredients }}>
          <TotalPriceContext.Provider value={{ stateTotalPrice }}>
            <OrderContext.Provider value={{ stateOrders, dispatcherOrders }}>
              <IngredientsContext.Provider value={{ stateIngredients }}>
                <AppMain modalControls={modalControls} />
              </IngredientsContext.Provider>
            </OrderContext.Provider>
          </TotalPriceContext.Provider>
        </ConstructorIngredientsContext.Provider>
      </div>

      {isModalOpen && <Modal header={contentModal?.header} closeModal={closeModal}>{contentModal.main}</Modal>}
    </>
  );
}

export default App;
