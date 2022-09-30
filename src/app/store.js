import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from "./features/counter/cartCounterSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import cartItemReducer from "./features/cartItem/cartItemSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: cartCounterReducer,
    posts: postsReducer,
    users: usersReducer,
    cartItems: cartItemReducer,
    user: userReducer,
  },
});
