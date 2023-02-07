import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "../features/auth/userSlice";
import cartSlice from "../features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
  middleware: (gDM) => gDM().concat(logger),
});
