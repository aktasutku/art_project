import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItemtoCart: {
      reducer(state, action) {
        state.push(action.payload);
        // state.map((item) => {
        //   if (item.id === action.payload.id) {
        //     let index = state.cartItems.indexOf(item);
        //     console.log(index);
        //   } else {
        //     state.push(action.payload);
        //   }
      },
      prepare(id, title, eachPrice, qty, total, img) {
        return {
          payload: {
            id,
            title,
            eachPrice,
            qty,
            total,
            img,
          },
        };
      },
    },
  },
});

export const selectAllCartItems = (state) => state.cartItems;

export const { addItemtoCart } = cartSlice.actions;

export default cartSlice.reducer;
