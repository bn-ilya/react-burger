// Styles
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import styles from './app.module.css';
// Components
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
import Modal from '../modal/modal';

// Redux hook
import { useSelector } from 'react-redux';

function App() {
  const isFetchIngredients = useSelector(state => state.ingredients.ingredientsRequest);
  const isFailedIngredients = useSelector(state => state.ingredients.ingredientsFailed)

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
