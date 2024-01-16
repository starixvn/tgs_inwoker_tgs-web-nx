import styled from "styled-components";
import {
  Button as MuiButton,
  FormControl as MuiFormControl,
  styled as muiStyled,
} from "@mui/material";
import { media } from "@/theme/breakpoints";

export const Remark = styled.div`
  font-size: 0.937rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  ${media.sm} {
    max-width: 500px;
  }
`;

export const LabelContainer = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.blue50};
  float: left;
  margin-bottom: 16px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
  borderBottom: `1px solid ${theme.palette.gray10}`,
  justifyContent: "center",

  "& fieldset": {
    border: "none",
  },

  "& input": {
    padding: "10px 0",
  },
})) as typeof MuiFormControl;

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.text};

  display: flex;
  align-items: center;
`;

export const UploadFileButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "0.875rem",
  height: "50px",
  color: "#828282",
  background: theme.palette.mainBackground,
  border: `1px solid ${theme.palette.gray10}`,
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.text};

  display: flex;
  align-items: center;
`;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "50px",
  whiteSpace: "nowrap",
  padding: "16px",
  fontSize: "1rem",
  lineHeight: 1,
  fontWeight: 700,
  color: theme.palette.white,
  background: theme.palette.primary.main,
  boxShadow: "none",

  "&:hover": {
    background: theme.palette.gray30,
  },

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
`;
