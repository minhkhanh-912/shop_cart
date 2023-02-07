import { Box, Chip } from "@mui/material";
import React, { useMemo } from "react";

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (fillter) => "Mien phi giao hang",
    isActive: (fillter) => fillter.isFreeShip,
    isVisible: (fillter) => true,
    isRemovable: false,
    onRemove: (fillter) => {},
    ontoggle: (fillter, onchange) => {
      const newfilter = {
        ...fillter,
      };
      newfilter.isFreeShip
        ? delete newfilter.isFreeShip
        : (newfilter.isFreeShip = true);
      console.log(newfilter);
      onchange(newfilter);
    },
  },
  {
    id: 2,
    getLabel: (fillter) => "Co Khuyen Mai",
    isActive: (fillter) => fillter.isPromotion,
    isVisible: (fillter) => fillter.isPromotion,
    isRemovable: true,
    onRemove: (fillter, onchange) => {
      const newfilter = {
        ...fillter,
        // isPromotion: false,
      };
      delete newfilter.isPromotion;
      // console.log(newfilter);
      onchange(newfilter);
    },
    ontoggle: (fillter) => {},
  },
  {
    id: 3,
    getLabel: (fillter) => {
      return `${fillter.salePrice_gte} - ${fillter.salePrice_lte}`;
    },
    isActive: (fillter) => fillter.salePrice_gte && fillter.salePrice_lte,
    isVisible: (fillter) => fillter.salePrice_gte && fillter.salePrice_lte,
    isRemovable: true,
    onRemove: (fillter, onchange) => {
      const newfilter = {
        ...fillter,
      };
      delete newfilter.salePrice_gte;
      delete newfilter.salePrice_lte;
      console.log(newfilter);
      onchange(newfilter);
    },
    ontoggle: (fillter) => {},
  },
];
const PreviewFilter = ({ fillter = {}, onchange = () => {} }) => {
  const visibleFilter = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(fillter));
  }, [fillter]);
  return (
    <Box padding={1} style={{ display: "flex", gap: "10px" }}>
      {visibleFilter.map((item) => (
        <Chip
          label={item.getLabel(fillter)}
          color={item.isActive(fillter) ? "primary" : "default"}
          onDelete={
            item.isRemovable ? () => item.onRemove(fillter, onchange) : null
          }
          clickable={!item.isRemovable}
          onClick={
            item.isRemovable ? null : () => item.ontoggle(fillter, onchange)
          }
          key={item.id}
        />
      ))}
    </Box>
  );
};

export default PreviewFilter;
