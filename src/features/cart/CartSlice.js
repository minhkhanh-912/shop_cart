import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    miniCart: false,
    cartItems: [],
  },
  reducers: {
    setMiniCart: (state) => {
      state.miniCart = true;
    },
    removeMiniCart: (state) => {
      state.miniCart = false;
    },
    AddtoCart: (state, action) => {
      const newItem = action.payload;
      const Index = state.cartItems.findIndex((item) => item.id === newItem.id);
      if (Index >= 0) {
        //update cart ++
        state.cartItems[Index].quantity += newItem.quantity;
      } else {
        //add to cart
        state.cartItems.push(newItem);
      }
    },
    setQuantity: (state, action) => {
      const Index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (Index >= 0) {
        state.cartItems[Index].quantity = action.payload.quantity;
      }
    },
    RemoveCart: (state, action) => {
      state.cartItems = state.cartItems.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  setMiniCart,
  removeMiniCart,
  AddtoCart,
  setQuantity,
  RemoveCart,
} = cartSlice.actions;

export default cartSlice.reducer;
