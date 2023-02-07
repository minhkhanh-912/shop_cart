import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../../api/categoryApi";

const FilteCategory = ({ onchange = () => {} }) => {
  const [categoris, setcategoris] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await categoryApi.getAll();
        setcategoris(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Box>
      <Typography fontWeight={700}>Danh mục sản phẩm</Typography>
      {categoris.length > 0 &&
        categoris.map((item, index) => (
          <Typography
            fontWeight={500}
            key={item.id}
            onClick={() => onchange(item.id)}>
            {item?.name}
          </Typography>
        ))}
    </Box>
  );
};

export default FilteCategory;
