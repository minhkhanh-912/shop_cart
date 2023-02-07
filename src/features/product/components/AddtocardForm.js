import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@mui/material";
import InputFiled from "../../../components/input/Input";
import Quantity from "../../../components/input/Quantity";

const schema = yup
  .object({
    quantity: yup
      .number()
      .required()
      .min(1, "min enter at least 1")
      .typeError("please enter a number"),
  })
  .required();
const AddtocardForm = ({ onSubmit = null }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values) => {
    // console.log("!23");
    if (onSubmit) onSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Quantity
        errors={errors}
        name="quantity"
        label="Number"
        type="number"
        setValue={setValue}
        control={control}></Quantity>
      <Button color="primary" variant="contained" type="submit">
        ADD Cart
      </Button>
    </form>
  );
};

export default AddtocardForm;
