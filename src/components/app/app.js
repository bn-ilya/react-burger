// Styles
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import styles from './app.module.css';
// Components
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';
// Hooks
import { useReducer, useState } from 'react';
// Contexts
import { OrderContext } from '../../services/orders-context';
// Reducers
import { reducerOrders, initialOrders } from '../../reducers/orders-reducer';
// Redux hook
import { useSelector } from 'react-redux';

function App() {

  console.log('render-app')
  const isFetchIngredients = useSelector(state => state.ingredients.ingredientsRequest);
  const isFailedIngredients = useSelector(state => state.ingredients.ingredientsFailed)

  const [stateOrders, dispatcherOrders] = useReducer(reducerOrders, initialOrders);

  if (isFetchIngredients) return (<Loading />);
  // При клике на кнопку должно быть действие
  if (isFailedIngredients) return (<ErrorRequest />);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <OrderContext.Provider value={{ stateOrders, dispatcherOrders }}>
          <AppMain />
        </OrderContext.Provider>
      </div>

      <Modal />
    </>
  );
}

export default App;
