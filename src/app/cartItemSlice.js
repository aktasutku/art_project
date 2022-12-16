import { createSlice, nanoid } from "@reduxjs/toolkit";

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

      state.totalQuantity += newItem.qty;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          qty: newItem.qty,
          totalPrice: newItem.totalPrice,
          images: newItem.images,
          discount: newItem.discount,
          discountedPrice: newItem.discountedPrice,
        });
      } else {
        existingItem.qty += newItem.qty;
        existingItem.totalPrice += newItem.qty * newItem.discountedPrice;
      }
    },
    removeItemFromCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id == action.payload
      );
      state.totalQuantity -= existingItem.qty;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateExistingCartItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalQuantity = Number(
        state.totalQuantity - existingItem.qty + action.payload.itemQty
      );
      if (action.payload.itemQty == 0)
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      else {
        existingItem.qty = action.payload.itemQty;
        existingItem.totalPrice =
          action.payload.itemQty * existingItem.discountedPrice;
      }
    },
  },
});

export const selectAllCartItems = (state) => state.cartItems.items;
export const totalQuantity = (state) => state.cartItems.totalQuantity;

export const { addItemtoCart, updateExistingCartItem, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
