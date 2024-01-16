import styled from "styled-components";
import {
  Button as MuiButton,
  FormControl as MuiFormControl,
  styled as muiStyled,
} from "@mui/material";
import { media } from "@/theme/breakpoints";

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  ${media.sm} {
    max-width: 500px;
  }
`;

export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  height: "44px",
  width: "100%",
  fontSize: "0.875rem",
  border: `1px solid ${theme.palette.grey07}`,
  background: theme.palette.inputBGC,
  justifyContent: "center",
  borderRadius: "6px",

  "& fieldset": {
    border: "none",
  },

  "& input": {
    padding: "11.5px 20px",
  },
})) as typeof MuiFormControl;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "50px",
  whiteSpace: "nowrap",
  padding: "16px",
  fontSize: "1rem",
  lineHeight: 1,
  fontWeight: 700,
  color: theme.palette.black,
  background: theme.palette.primary.main,
  boxShadow: "none",
  border: "none",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
`;
