import { Tab, Tabs } from "@mui/material";
import React from "react";

const ProductSort = ({ value = "", handleChange = () => {} }) => {
  return (
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="Giá Cao - Thấp" value="salePrice:ASC" />
      <Tab label="Giá Thấp - Cao" value="salePrice:DESC" />
    </Tabs>
  );
};

export default ProductSort;
