import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder as createOrderApi } from '../../utils/burger-api';

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async function (ids, { rejectWithValue, dispatch }) {
        try {
            const res = await createOrderApi(ids);
            dispatch(addOrder(res));
            return res
        } catch (error) {
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
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.orderRequest = true
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.orderRequest = false
                state.orderFailed = false
            })
            .addCase(createOrder.rejected, (state) => {
                state.orderRequest = false
                state.orderFailed = true
            })
    }
})

export default ordersSlice.reducer;
export const { addOrder } = ordersSlice.actions; 