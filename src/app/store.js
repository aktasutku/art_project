import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from "./features/counter/cartCounterSlice";

import cartItemReducer from "./features/cartItem/cartItemSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: cartCounterReducer,
    cartItems: cartItemReducer,
    user: userReducer,
  },
});
