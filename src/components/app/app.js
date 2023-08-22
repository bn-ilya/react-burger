import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Actions
import { getIngredients } from '../../services/reducers/ingredients';

function App() {
  const dispatch = useDispatch();
  const isFetchIngredients = useSelector(state => state.ingredients.ingredientsRequest);
  const isFailedIngredients = useSelector(state => state.ingredients.ingredientsFailed);

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  if (isFetchIngredients) return (<Loading />);
  if (isFailedIngredients) return (<ErrorRequest />);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <AppMain />
      </div>

      <Modal />
    </>
  );
}

export default App;
