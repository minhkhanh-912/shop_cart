import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Quantity from "../../components/input/Quantity";
import AddtocardForm from "../product/components/AddtocardForm";
import ProductThumnail from "../product/components/ProductThumnail";
import * as yup from "yup";
import { RemoveCart, setQuantity } from "./CartSlice";
import { cartItemCountSelector, cartItemTotalSelector } from "./Selector";

const CartFeature = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const dispatch = useDispatch();
  const handleDeleteCart = (id) => {
    dispatch(RemoveCart(id));
  };

  const cartItemTotal = useSelector(cartItemTotalSelector);
  const cartItemCount = useSelector(cartItemCountSelector);

  const handleOnChange = (e) => {};
  const handleNumberOf = (id, quantity) => {
    console.log(quantity);
    if (quantity >= 1) dispatch(setQuantity({ id, quantity }));
    else {
      dispatch(RemoveCart(id));
    }
  };
  return (
    <Box pt={4}>
      <Container>
        <Typography variant="h6">Số sản phẩm: {cartItemCount || ""}</Typography>
        <Paper
          elevation={0}
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
          {cartItems.length > 0 &&
            cartItems.map((cartItem) => (
              <Box
                style={{ display: "flex", justifyContent: "space-between" }}
                key={cartItem.id}>
                <Box style={{ display: "flex", gap: "30px" }}>
                  <img
                    src={
                      cartItem.thumbnail
                        ? `https://api.ezfrontend.com${cartItem?.thumbnail?.url}`
                        : "https://source.unsplash.com/random"
                    }
                    alt=""
                    style={{ height: "100px", width: "100px" }}
                  />
                  <Box>
                    <Typography variant="h6">
                      {cartItem.product.name}
                    </Typography>
                    <Typography variant="h6">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(cartItem.product.salePrice)}
                    </Typography>
                  </Box>
                </Box>
                <Box style={{ display: "flex", gap: "30px" }}>
                  <Box style={{ display: "flex", gap: "10px" }}>
                    <Box
                      style={{ padding: "10px", cursor: "pointer" }}
                      onClick={() => {
                        handleNumberOf(
                          cartItem.id,
                          Number(cartItem.quantity) - 1
                        );
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        style={{ width: "20px" }}
                        class="w-6 h-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </Box>
                    <input
                      style={{ height: "30px", width: "30px" }}
                      value={cartItem.quantity}
                      onChange={handleOnChange}></input>
                    <Box
                      style={{ padding: "10px", cursor: "pointer" }}
                      onClick={() => {
                        handleNumberOf(
                          cartItem.id,
                          Number(cartItem.quantity) + 1
                        );
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        style={{ width: "20px" }}
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Box>
                  </Box>
                  <Typography
                    variant="h6"
                    onClick={() => handleDeleteCart(cartItem.id)}>
                    Xóa
                  </Typography>
                </Box>
              </Box>
            ))}
          {cartItems.length <= 0 && (
            <Typography variant="h6">
              Không còn sản phẩm trong giỏ hàng
            </Typography>
          )}
          <Typography variant="h6">
            Tổng Giá Tiền:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(cartItemTotal)}{" "}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default CartFeature;
