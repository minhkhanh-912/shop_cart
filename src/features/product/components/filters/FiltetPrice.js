import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const FiltetPrice = ({ onchange = () => {} }) => {
  const [prices, setprices] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleChane = (e) => {
    const { name, value } = e.target;

    setprices({ ...prices, [name]: value });
  };
  const handleSubmit = () => {
    if (!onchange) return;
    if (prices.salePrice_lte > 0) {
      onchange(prices);
    }
  };
  return (
    <Box>
      <Typography fontWeight={700}>Gia</Typography>

      <Box
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "10px",
        }}>
        <TextField
          name="salePrice_gte"
          variant="standard"
          value={prices.salePrice_gte}
          onChange={handleChane}></TextField>
        <span>-</span>
        <TextField
          name="salePrice_lte"
          variant="standard"
          value={prices.salePrice_lte}
          onChange={handleChane}></TextField>
      </Box>
      <Button color="primary" variant="outlined" onClick={handleSubmit}>
        Ap Dung
      </Button>
    </Box>
  );
};

export default FiltetPrice;
