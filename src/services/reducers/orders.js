import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder as createOrderApi } from '../../utils/burger-api';
import { openModal } from './modal';

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async function (ids, { rejectWithValue, dispatch }) {
        try {
            const res = await createOrderApi(ids);
            dispatch(addOrder(res));
            dispatch(openModal({ content: res.order.number, type: 'order' }))
        } catch (error) {
            dispatch(openModal({ content: error.message, type: 'error' }))
            return rejectWithValue(error);
        };
    }
)

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        orderRequest: false,
        orderFailed: false,
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload)
        }
    },
    extraReducers: {
        [createOrder.pending]: (state) => {
            state.orderRequest = true
        },
        [createOrder.fulfilled]: (state) => {
            state.orderRequest = false
            state.orderFailed = false
        },
        [createOrder.rejected]: (state) => {
            state.orderRequest = false
            state.orderFailed = true
        }
    }
})

export default ordersSlice.reducer;
export const { addOrder} = ordersSlice.actions; 