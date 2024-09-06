import { Checkbox as MuiCheckbox } from "@mui/material";
import styled from "styled-components";

export const Checkbox = styled(MuiCheckbox)`
  color: ${({ theme }) => theme.text};

  &.Mui-checked .MuiSvgIcon-root {
    color: ${({ theme }) => theme.activeCheckBoxBackground};
  }

  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.checkBoxBackground};
    border-radius: 0.5rem;
    width: 2.4rem;
    height: 2.4rem;
  }
`;
