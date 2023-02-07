import { Box, Typography } from "@mui/material";
import React from "react";

const ProductInfo = ({ item = {} }) => {
  console.log(item);
  const { name, shortDescription, originalPrice, salePrice, promotionPercent } =
    item;
  return (
    <Box>
      <Typography variant="h4">{name}</Typography>
      <Typography>{shortDescription}</Typography>
      <Box
        style={{
          padding: "10px",
          backgroundColor: "#ccc",
          display: "flex",
          gap: "10px",
          alignItems: "end",
          marginBottom: "10px"
        }}>
        <Box component={"span"} style={{ fontSize: "30px" }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" style={{ textDecoration: "line-through" }}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(originalPrice)}
            </Box>
            <Box component="span">{promotionPercent}%</Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductInfo;
