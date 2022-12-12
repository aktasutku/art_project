import { createSlice } from "@reduxjs/toolkit";

export const cartCounterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    itemTotal: 0,
  },
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
    addValue: (state, action) => {
      state.count += Number(action.payload);
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setItemTotal: (state, action) => {
      state.itemTotal += action.payload;
    },
  },
});

export const { increment, decrement, reset, addValue, setCount, setItemTotal } =
  cartCounterSlice.actions;

export default cartCounterSlice.reducer;
