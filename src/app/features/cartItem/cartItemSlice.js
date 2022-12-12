import { createSlice, nanoid } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartItems",
  initialState: [],
  reducers: {
    addItemtoCart: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(
        id,
        title,
        eachPrice,
        qty,
        total,
        img,
        discount,
        discountedPrice
      ) {
        return {
          payload: {
            id,
            title,
            eachPrice,
            qty,
            total,
            img,
            discount,
            discountedPrice,
          },
        };
      },
    },
    updateExistingCartItemQty: {
      reducer(state, action) {
        state = state.map((item) => {
          if (item.id === action.payload.id) {
            item.qty = action.payload.qty;
            item.total = action.payload.total;
          }
        });
      },
      prepare(id, qty, total) {
        return {
          payload: {
            id,
            qty,
            total,
          },
        };
      },
    },
    removeCartItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const selectAllCartItems = (state) => state.cartItems;

export const { addItemtoCart, updateExistingCartItemQty, removeCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
