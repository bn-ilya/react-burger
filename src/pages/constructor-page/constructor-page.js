// Components
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Main from './main/main';

import ContainerPage from '../../components/container-page/container-page';
import ErrorRequestPage from '../../components/error-request-page/error-request-page';
import Header from '../../components/header/header';
import LoadingPage from '../../components/loading-page/loading-page';
// Hooks

// Actions
import { getIngredients } from '../../services/reducers/ingredients';

export default function ConstructorPage() {
  const dispatch = useDispatch();
  const isFetchIngredients = useSelector(
    (state) => state.ingredients.ingredientsRequest,
  );
  const isFailedIngredients = useSelector(
    (state) => state.ingredients.ingredientsFailed,
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (isFetchIngredients) return <LoadingPage />;
  if (isFailedIngredients) return <ErrorRequestPage />;

  return (
    <ContainerPage>
      <Header />
      <Main />
    </ContainerPage>
  );
}
