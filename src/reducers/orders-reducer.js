export const initialOrders = {orders: []};
export const reducerOrders = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return(
                {orders: [...state.orders, action.payload]}
            )
        default:
            return state
    }
}