import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = (state) => state.cart.cartItems;

export const cartItemCountSelector = createSelector(
  cartItemsSelector,
  (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const cartItemTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.salePrice,
      0
    )
);
