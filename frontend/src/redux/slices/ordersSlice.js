import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',

  initialState,

  reducers: {
    placeOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { placeOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
