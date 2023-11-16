import React from "react";
import { Checkbox as MuiCheckbox, CheckboxProps } from "@mui/material";
import styled from "styled-components";

const StyledCheckbox = styled(MuiCheckbox)`
  color: ${({ theme }) => theme.white};
  &.Mui-checked {
    color: ${({ theme }) => theme.primary};
  }
`;
const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
