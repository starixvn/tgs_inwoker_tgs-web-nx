import React from "react";
import { Checkbox as MuiCheckbox, CheckboxProps } from "@mui/material";
import styled from "styled-components";

const StyledCheckbox = styled(MuiCheckbox)`
  color: white;
  &.MuiCheckbox-root {
    padding: 0 9px 0 0;
  }
  &.Mui-checked {
    color: ${({ theme }) => theme.yellow};
  }
`;
const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
