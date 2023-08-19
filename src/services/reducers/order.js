import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {}
    },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload
        }
    }
})

export default orderSlice.reducer;
export const {setOrder} = orderSlice.actions; 