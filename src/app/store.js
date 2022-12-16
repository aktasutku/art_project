import { configureStore } from "@reduxjs/toolkit";

import cartItemReducer from "./features/cartItem/cartItemSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    cartItems: cartItemReducer,
    user: userReducer,
  },
});
