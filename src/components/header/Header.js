import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Alert,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Menu,
  MenuItem,
} from "@mui/material";
import InputFiled from "../input/Input";

import productApi from "../../api/productApi";
import SignUp from "../../features/auth/pages/signUp";
import SignIn from "../../features/auth/pages/signIn";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, Circle } from "@mui/icons-material";
import { Logout } from "../../features/auth/userSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { cartItemCountSelector } from "../../features/cart/Selector";
import { removeMiniCart, setMiniCart } from "../../features/cart/CartSlice";
const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { current: userInfo } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleSignOut = () => {
    handleCloseAnchor();
    dispatch(Logout());
  };
  const cartItems = useSelector((state) => state.cart.cartItems);

  const MiniCart = useSelector((state) => state.cart.miniCart);

  const Cartcount = cartItems.length;

  const navigate = useNavigate();

  const handleRemoveMiniCart = () => {
    dispatch(removeMiniCart());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 3 }}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              <Link
                variant="h6"
                style={{ color: "inherit" }}
                component={NavLink}
                to="/">
                Shope-Cart
              </Link>
            </Typography>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                navigate("/cart");
                dispatch(removeMiniCart());
              }}>
              <Badge badgeContent={Cartcount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {MiniCart && (
              <Alert
                style={{ position: "absolute", top: "90%", right: "20px" }}
                onClose={handleRemoveMiniCart}>
                Thêm sản phẩm vào giỏ hàng thành công!
              </Alert>
            )}
            {!userInfo?.id && (
              <Button color="inherit" onClick={handleClickOpen}>
                Register/Login
              </Button>
            )}
            {userInfo?.id && (
              <IconButton color="inherit" onClick={handleClickAnchor}>
                <AccountCircle color="inherit"></AccountCircle>
              </IconButton>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseAnchor}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <DialogSimple open={open} handleClose={handleClose}></DialogSimple>
    </>
  );
};

const DialogSimple = ({ handleClose = () => {}, open = false }) => {
  const [mode, setmode] = React.useState(MODE.LOGIN);
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign={"center"}>
        {mode === MODE.REGISTER ? "Create acount" : "Sign in"}
      </DialogTitle>
      <DialogContent>
        {mode === MODE.REGISTER && (
          <>
            <SignUp></SignUp>
            <Box>
              Already have an acount ?{" "}
              <Button color="primary" onClick={() => setmode(MODE.LOGIN)}>
                Login
              </Button>
            </Box>
          </>
        )}
        {mode === MODE.LOGIN && (
          <>
            <SignIn></SignIn>
            <Box>
              don't have an acount ?
              <Button color="primary" onClick={() => setmode(MODE.REGISTER)}>
                Register
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancle</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Header;
