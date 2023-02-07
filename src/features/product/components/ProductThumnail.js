import { Box } from "@mui/system";
import React from "react";

const ProductThumnail = ({ item }) => {
  const thumbnailUrl = item.thumbnail
    ? `https://api.ezfrontend.com${item?.thumbnail?.url}`
    : "https://source.unsplash.com/random";
  return (
    <Box>
      <img
        src={thumbnailUrl}
        alt=""
        style={{ height: "300px", width: "100%" }}
      />
    </Box>
  );
};

export default ProductThumnail;
