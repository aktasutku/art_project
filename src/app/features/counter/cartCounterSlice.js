import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  itemTotal: 0,
};

export const cartCounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
    addValue: (state, action) => {
      state.count = state.count + Number(action.payload);
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setItemTotal: (state, action) => {
      state.itemTotal += action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  reset,
  addValue,
  setCount,
  setItemTotal,
} = cartCounterSlice.actions;

export default cartCounterSlice.reducer;
