import { createSlice, nanoid } from "@reduxjs/toolkit";
console.log("gg");
const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemtoCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
    },
  },
});

export const selectAllCartItems = (state) => state.cartItems;

export const { addItemtoCart, updateExistingCartItemQty, removeCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
