import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from "./features/counter/cartCounterSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    counter: cartCounterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
