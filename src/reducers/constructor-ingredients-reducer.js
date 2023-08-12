export const initialConstructorIngredients = { constructorIngredients: null }
export const reducerConstructorIngredients = (state, action) => {

    switch (action.type) {
        case 'SET_CONSTRUCTOR_INGREDIENTS':
            return { constructorIngredients: action.payload }
        default:
            return state;
    }
}