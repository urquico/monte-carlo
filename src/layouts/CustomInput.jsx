import React from "react";
import { NumberInput } from "@mantine/core";

function CustomInput({ label, defaultValue, placeHolder, valueChange }) {
  return (
    <NumberInput
      defaultValue={defaultValue}
      placeholder={placeHolder}
      label={label}
      onChange={valueChange}
    />
  );
}

export default CustomInput;
