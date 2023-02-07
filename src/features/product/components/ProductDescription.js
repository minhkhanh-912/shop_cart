import DOMPurify from "dompurify";
import React from "react";

const ProductDescription = ({ item = {} }) => {
  console.log(item);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(item.description),
      }}></div>
  );
};

export default ProductDescription;
