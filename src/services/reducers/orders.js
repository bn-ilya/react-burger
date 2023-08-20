import { createSlice } from '@reduxjs/toolkit';
import { createOrder as createOrderApi } from '../../utils/burger-api';

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
        }
    }
})

export const createOrder = (ids) => {
    createOrderApi(ids)
        .then(data => {
            dispatcherOrders({
                type: ADD_ORDER,
                payload: data
            })

            modalControls.setContentModal({
                main: <OrderDetails number={data.order.number} />
            })
            modalControls.openModal(true);
        })
        .catch(data => {
            modalControls.setContentModal({
                main: <ModalError error={data.message} />
            })
            modalControls.openModal(true);
        })
        .finally(() => {
            setIsCreateOrder(false);
        })
}

export default ordersSlice.reducer;
export const { addOrder } = ordersSlice.actions; 