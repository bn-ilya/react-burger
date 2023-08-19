import {createSlice} from '@reduxjs/toolkit';

const totalPriceSlice = createSlice({
    name: 'totalPrice',
    initialState: {
        totalPrice: 0
    },
    reducers: {
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload
        }
    }
})

export default totalPriceSlice.reducer;
export const {setTotalPrice} = totalPriceSlice.actions; 