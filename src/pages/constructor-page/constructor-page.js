// Styles
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
// Components
import Header from '../../components/header/header';
import Main from './main/main';
import Loading from './loading/loading';
import ErrorRequest from './error-request/error-request';
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

    if (isFetchIngredients) return (<Loading />);
    if (isFailedIngredients) return (<ErrorRequest />);

    return (
        <ContainerPage>
            <Header />
            <Main />
        </ContainerPage>
    )
}