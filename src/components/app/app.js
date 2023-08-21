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
import { addingredients, setBunBottom, setBunTop } from '../../services/reducers/ingredients-constructor';

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const isFetchIngredients = useSelector(state => state.ingredients.ingredientsRequest);
  const isFailedIngredients = useSelector(state => state.ingredients.ingredientsFailed);

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  useEffect(() => {
    if (ingredients.length) {
      const bun = ingredients.find(ingredient => ingredient.type === 'bun');
      const toppings = ingredients.filter(ingredient => ingredient.type !== 'bun');

      dispatch(addingredients(toppings));
      dispatch(setBunTop(bun));
      dispatch(setBunBottom(bun));
    }
  }, [ingredients, dispatch]);

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
