import { Image } from "@mui/icons-material";
import { Box, ImageListItemBar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ item = {} }) => {
  const thumbnailUrl = item.thumbnail
    ? `https://api.ezfrontend.com${item?.thumbnail?.url}`
    : "https://source.unsplash.com/random";
  const navigate = useNavigate();
  const handleNavigationDetail = () => {};
  return (
    <Box onClick={() => navigate(`/${item.id}`)} style={{ cursor: "pointer" }}>
      <img
        src={thumbnailUrl}
        alt=""
        style={{ height: "150px", width: "100%" }}
      />
      <Typography>{item?.name}</Typography>
      <Typography>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(item.salePrice)}{" "}
        - {item.promotionPercent}%
      </Typography>
    </Box>
  );
};

export default ProductItem;
