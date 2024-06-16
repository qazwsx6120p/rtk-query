import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

/** 創建 Redux store */
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
