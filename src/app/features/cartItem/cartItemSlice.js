import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [{}];

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItemtoCart: {
      reducer(state, action) {},
      prepare(title, eachPrice, qty) {
        return {
          payload: {
            id: nanoid(),
            title,
            eachPrice,
            qty,
            total,
          },
        };
      },
    },
  },
});
