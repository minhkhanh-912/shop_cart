import { Box, Grid, Pagination, Paper } from "@mui/material";
import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ data = [] }) => {
  return (
    <Box>
      <Grid container>
        {data.length > 0 &&
          data.map((item, i) => (
            <Grid item lg={3} md={4} key={item.id}>
              <Box padding={1}>
                <ProductItem item={item}></ProductItem>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
