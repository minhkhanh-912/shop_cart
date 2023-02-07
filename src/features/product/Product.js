import { Box } from "@mui/system";
import React from "react";
import Layout from "../../layouts/Layout";
import Listpage from "./pages/ProductPage/Listpage";

const Product = () => {
  return (
    <Box pt={4}>
      <Listpage></Listpage>
    </Box>
  );
};

export default Product;
