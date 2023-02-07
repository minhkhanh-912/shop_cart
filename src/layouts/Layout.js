import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
