// Components
import { useEffect } from 'react';
import type { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/rtk-hooks';

import Main from './main/main';

import ContainerPage from '../../components/container-page/container-page';
import ErrorRequestPage from '../../components/error-request-page/error-request-page';
import Header from '../../components/header/header';
import LoadingPage from '../../components/loading-page/loading-page';

import { getIngredients } from '../../services/reducers/ingredients';
import { ingredientsRequest } from '../../services/selectors';
import { ingredientsFailed } from '../../services/selectors';

const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const isFetchIngredients = useAppSelector(ingredientsRequest);
  const isFailedIngredients = useAppSelector(ingredientsFailed);

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