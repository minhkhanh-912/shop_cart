import { Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const ProductMenu = ({ id }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "30px",
      }}>
      <Link component={NavLink} to={`/${id}`}>
        Description
      </Link>
      <Link component={NavLink} to={`/${id}/additional`}>
        Additional Infomation
      </Link>
      <Link component={NavLink} to={`/${id}/reviews`}>
        Review
      </Link>
    </Box>
  );
};

export default ProductMenu;
