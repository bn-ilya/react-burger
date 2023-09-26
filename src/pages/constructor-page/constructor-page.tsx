// Components
import { useEffect } from 'react';

import Main from './main/main';

import ContainerPage from '../../components/container-page/container-page';
import ErrorRequestPage from '../../components/error-request-page/error-request-page';
import Header from '../../components/header/header';
import LoadingPage from '../../components/loading-page/loading-page';
import { useAppSelector, useAppDispatch } from '../../hooks/rtk-hooks';

import { getIngredients } from '../../services/reducers/ingredients';
import { selectIngredientsRequest, selectIngredientsFailed } from '../../services/selectors';

import type { FC } from 'react';

const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const isFetchIngredients = useAppSelector(selectIngredientsRequest);
  const isFailedIngredients = useAppSelector(selectIngredientsFailed);

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
};

export default ConstructorPage;
