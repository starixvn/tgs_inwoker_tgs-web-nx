import React from "react";
import { Checkbox as MuiCheckbox, CheckboxProps } from "@mui/material";
import styled from "styled-components";

const StyledCheckbox = styled(MuiCheckbox)`
  color: ${({ theme }) => theme.white} !important;
  &.Mui-checked {
    color: ${({ theme }) => theme.priBTNOutline} !important;
  }
`;
const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
