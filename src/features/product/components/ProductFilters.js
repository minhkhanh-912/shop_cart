import { Box } from "@mui/material";
import React, { useEffect } from "react";
import FilteCategory from "./filters/FilteCategory";
import FilterService from "./filters/FilterService";
import FiltetPrice from "./filters/FiltetPrice";

const ProductFilters = ({ fillter = "", onchange = () => {} }) => {
  useEffect(() => {}, []);
  const handleCategoryChange = (newCategoryId) => {
    if (!onchange) return;
    console.log(newCategoryId);
    const newFilter = {
      ...fillter,
      "category.id": newCategoryId,
    };
    onchange(newFilter);
  };
  const handleChange = (values) => {
    if (!onchange) return;
    onchange(values);
  };
  return (
    <Box padding={1}>
      <FilteCategory onchange={handleCategoryChange}></FilteCategory>
      <FiltetPrice onchange={handleChange}></FiltetPrice>
      <FilterService fillter={fillter} onchange={handleChange}></FilterService>
    </Box>
  );
};

export default ProductFilters;
