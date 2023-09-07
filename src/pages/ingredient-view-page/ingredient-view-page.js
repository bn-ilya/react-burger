import Header from "../../components/header/header"
import ContainerPage from "../../components/container-page/container-page";
import Main from "./main/main";
import LoadingPage from "../../components/loading-page/loading-page";
import ErrorRequestPage from "../../components/error-request-page/error-request-page";
// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// Actions
import { getIngredients } from '../../services/reducers/ingredients';
import { selectIsLoadedIngredients } from "../../services/selectors";

export default function IngredientViewPage() {
    const dispatch = useDispatch();
    const isFetchIngredients = useSelector(state => state.ingredients.ingredientsRequest);
    const isFailedIngredients = useSelector(state => state.ingredients.ingredientsFailed);
    const isLoadedIngredients = useSelector(selectIsLoadedIngredients);

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    if (isFetchIngredients) return (<LoadingPage />);
    if (isFailedIngredients) return (<ErrorRequestPage />);
    if (!isLoadedIngredients) return null;

    return (
        <ContainerPage>
            <Header />
            <Main />
        </ContainerPage>
    )
}