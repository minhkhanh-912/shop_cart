import { Input, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const InputFiled = ({ control, name, label, errors }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  const hasError = errors[name];
  return (
    <TextField
      fullWidth
      id="outlined-basic"
      label={label}
      sx={{ mb: 1 }}
      control={control}
      {...field}
      error={!!hasError}
      helperText={errors[name]?.message}
      name={name}
      variant="outlined"
    />
  );
};

export default InputFiled;
