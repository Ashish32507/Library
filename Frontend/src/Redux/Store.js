import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import BookReducer from "./BookSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    book: BookReducer,
  },
});

export default store;
