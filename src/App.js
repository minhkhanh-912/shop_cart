import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import CartFeature from "./features/cart";
import ProductAdditional from "./features/product/components/ProductAdditional";
import ProductDescription from "./features/product/components/ProductDescription";
import ProductReviews from "./features/product/components/ProductReviews";
import DetailPage from "./features/product/pages/ProductDetail/DetailPage";
import Product from "./features/product/Product";
import Layout from "./layouts/Layout";

function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route path="/" element={<Product></Product>}></Route>
            <Route path="/cart" element={<CartFeature></CartFeature>}></Route>
            <Route path="/:productId" element={<DetailPage></DetailPage>}>
              {/* <Route
                path="/:productId"
                element={<ProductDescription></ProductDescription>}></Route> */}
              <Route
                path="/:productId/additional"
                element={<ProductAdditional></ProductAdditional>}></Route>
              <Route
                path="/:productId/reviews"
                element={<ProductReviews></ProductReviews>}></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
