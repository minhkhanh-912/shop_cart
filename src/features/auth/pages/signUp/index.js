import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@mui/material";
import { toast } from "react-toastify";
import InputFiled from "../../../../components/input/Input";
import { useDispatch } from "react-redux";
import { register } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const schema = yup
  .object({
    fullname: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6, "it nhat 6 ky tu"),
    cormfimpassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "mat khau nhap lai khong chinh xac"),
  })
  .required();
const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const handleSignUp = async (values) => {
    try {
      values.username = values.email;

      const action = await register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      console.log(user);
      toast.success("dang ky thanh cong");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    // console.log("!23");
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <InputFiled
        errors={errors}
        name="fullname"
        label="fullname"
        control={control}></InputFiled>
      <InputFiled
        errors={errors}
        name="email"
        label="email"
        control={control}></InputFiled>
      <InputFiled
        errors={errors}
        name="password"
        label="password"
        control={control}></InputFiled>
      <InputFiled
        errors={errors}
        name="cormfimpassword"
        label="cormfimpassword"
        control={control}></InputFiled>
      <Button color="primary" fullWidth variant="contained" type="submit">
        Register
      </Button>
    </form>
  );
};

export default SignUp;
