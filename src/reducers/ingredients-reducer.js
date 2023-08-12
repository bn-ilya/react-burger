export const initialIngredients = { ingredients: null }
export const reducerIngredients = (state, action) => {

    switch (action.type) {
        case 'SET_INGREDIENTS':
            return { ingredients: action.payload }
        default:
            return state;
    }
}