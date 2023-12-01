import { FC, useEffect } from 'react';

import Main from './main/main';

import ContainerPage from '../../components/container-page/container-page';
import ErrorRequestPage from '../../components/error-request-page/error-request-page';
import Header from '../../components/header/header';
import LoadingPage from '../../components/loading-page/loading-page';

import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { getIngredients } from '../../services/reducers/ingredients/ingredients';
import { selectIsLoadedIngredients } from '../../services/selectors';

const IngredientViewPage: FC = () => {
  const dispatch = useAppDispatch();
  const isFetchIngredients = useAppSelector((state) => state.ingredients.ingredientsRequest);
  const isFailedIngredients = useAppSelector((state) => state.ingredients.ingredientsFailed);
  const isLoadedIngredients = useAppSelector(selectIsLoadedIngredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (isFetchIngredients) return <LoadingPage />;
  if (isFailedIngredients) return <ErrorRequestPage />;
  if (!isLoadedIngredients) return null;

  return (
    <ContainerPage>
      <Header />
      <Main />
    </ContainerPage>
  );
};

export default IngredientViewPage;
