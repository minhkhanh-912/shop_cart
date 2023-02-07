import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const FilterService = ({ fillter = {}, onchange = () => {} }) => {
  const handleChane = (e) => {
    if (!onchange) return;
    const { name, checked } = e.target;
    const newfillter = {
      ...fillter,
      [name]: checked,
    };
    if (newfillter.isPromotion === false) {
      delete newfillter.isPromotion;
      delete fillter.isPromotion;
    }
    if (newfillter.isFreeShip === false) {
      delete newfillter.isFreeShip;
      delete fillter.isFreeShip;
    }

    onchange(Object.assign(newfillter, { ...fillter }));
    console.log(newfillter);
  };
  return (
    <Box>
      <Typography fontWeight={700}>Dich Vu</Typography>

      {["isPromotion", "isFreeShip"].map((service) => (
        <FormControlLabel
          key={service}
          control={
            <Checkbox
              checked={Boolean(fillter[service] === "true")}
              onChange={handleChane}
              name={service}
            />
          }
          label={service}
        />
      ))}
    </Box>
  );
};

export default FilterService;
