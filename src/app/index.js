import { configureStore } from "@reduxjs/toolkit";

import cartItemReducer from "./cartItemSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    cartItems: cartItemReducer,
    user: userReducer,
  },
});
