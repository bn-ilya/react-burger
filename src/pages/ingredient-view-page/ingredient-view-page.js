import Header from "../../components/header/header"
import ContainerPage from "../../components/container-page/container-page";
import Main from "./main/main";
import Loading from "../constructor-page/loading/loading";
import ErrorRequest from "../constructor-page/error-request/error-request";
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

    if (isFetchIngredients) return (<Loading />);
    if (isFailedIngredients) return (<ErrorRequest />);
    if (!isLoadedIngredients) return null;
    
    return (
        <ContainerPage>
            <Header />
            <Main />
        </ContainerPage>
    )
}