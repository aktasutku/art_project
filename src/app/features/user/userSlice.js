import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  photo: null,
  uid: null,
  admin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.uid = action.payload.uid;
      state.admin = action.payload.admin;
    },
    setUserSignOut: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
      state.uid = null;
      state.admin = null;
    },
  },
});

export const { setUserLoginDetails, setUserSignOut } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectAdmin = (state) => state.user.admin;

export default userSlice.reducer;
