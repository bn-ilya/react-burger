// Components
import Header from '../../components/header/header';
import Main from './main/main';
import LoadingPage from '../../components/loading-page/loading-page';
import ErrorRequestPage from '../../components/error-request-page/error-request-page';
import ContainerPage from '../../components/container-page/container-page';
// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// Actions
import { getIngredients } from '../../services/reducers/ingredients';

export default function ConstructorPage() {
    const dispatch = useDispatch();
    const isFetchIngredients = useSelector(state => state.ingredients.ingredientsRequest);
    const isFailedIngredients = useSelector(state => state.ingredients.ingredientsFailed);

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    if (isFetchIngredients) return (<LoadingPage />);
    if (isFailedIngredients) return (<ErrorRequestPage />);

    return (
        <ContainerPage>
            <Header />
            <Main />
        </ContainerPage>
    )
}