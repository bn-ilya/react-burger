import { createSlice } from '@reduxjs/toolkit';
import { createOrder as createOrderApi } from '../../utils/burger-api';
import { openModal } from './modal';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        orderRequest: false,
        orderFailed: false,
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload)
        },
        setOrderRequest: (state, action) => {
            state.orderRequest = action.payload
        },
        setOrderFailed: (state, action) => {
            state.orderFailed = action.payload
        }
    }
})

export const createOrder = (ids) => {
    return (dispatch) => {
        dispatch(setOrderRequest(true))
        createOrderApi(ids)
            .then(data => {
                dispatch(addOrder(data))
                dispatch(openModal({ content: data.order.number, type: 'order' }))
                dispatch(setOrderFailed(false))
            })
            .catch(data => {
                dispatch(openModal({ content: data.message, type: 'error' }))
                dispatch(setOrderFailed(true))
            })
            .finally(() => {
                dispatch(setOrderRequest(false))
            })
    }
}

export default ordersSlice.reducer;
export const { addOrder, setOrderRequest, setOrderFailed } = ordersSlice.actions; 