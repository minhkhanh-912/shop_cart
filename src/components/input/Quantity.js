import { Input, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useController } from "react-hook-form";

const Quantity = ({ control, name, label, errors, setValue, ...rest }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  const hasError = errors[name];
  return (
    <>
      <Box style={{ display: "flex", gap: "10px" }}>
        <Box
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() =>
            setValue(
              name,
              !Number.parseInt(field.value)
                ? 1
                : Number.parseInt(field.value) - 1
            )
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            style={{ width: "20px" }}
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Box>
        <TextField
          id="outlined-basic"
          label={label}
          sx={{ mb: 1 }}
          control={control}
          {...field}
          {...rest}
          error={!!hasError}
          helperText={errors[name]?.message}
          name={name}
          variant="outlined"
        />
        <Box
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() =>
            setValue(
              name,
              !Number.parseInt(field.value)
                ? 1
                : Number.parseInt(field.value) + 1
            )
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            style={{ width: "20px" }}
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Box>
      </Box>
    </>
  );
};

export default Quantity;
