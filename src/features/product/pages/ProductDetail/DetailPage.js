import { Box, Container, Grid, Paper } from "@mui/material";
import { logDOM } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import productApi from "../../../../api/productApi";
import { AddtoCart, setMiniCart } from "../../../cart/CartSlice";
import AddtocardForm from "../../components/AddtocardForm";
import ProductDescription from "../../components/ProductDescription";
import ProductInfo from "../../components/ProductInfo";
import ProductMenu from "../../components/ProductMenu";
import ProductThumnail from "../../components/ProductThumnail";

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setproduct] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const data = await productApi.get(productId);
      setproduct(data);
    })();
  }, [productId]);
  const handleAddCart = (values) => {
    dispatch(
      AddtoCart({
        id: product.id,
        product,
        quantity: values.quantity,
      })
    );
    dispatch(setMiniCart());
  };
  return (
    <Box pt={4}>
      <Container>
        <Grid container spacing={1}>
          <Grid item style={{ width: "500px" }}>
            <Paper elevation={0}>
              <ProductThumnail item={product}></ProductThumnail>
            </Paper>
          </Grid>
          <Grid item className="grid-right">
            <Paper elevation={0} style={{ padding: "20px" }}>
              <ProductInfo item={product}></ProductInfo>
              <AddtocardForm onSubmit={handleAddCart}></AddtocardForm>
            </Paper>
          </Grid>
        </Grid>
        <ProductMenu id={productId}></ProductMenu>
        {window.location.pathname === `/${productId}` ? (
          <ProductDescription item={product}></ProductDescription>
        ) : (
          <Outlet></Outlet>
        )}
      </Container>
    </Box>
  );
};

export default DetailPage;
