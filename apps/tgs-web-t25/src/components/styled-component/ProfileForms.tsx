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
  margin-bottom: 16px;
  background: linear-gradient(0deg, #262828, #262828), linear-gradient(0deg, #373939, #373939);
  padding: 24px 20px;
  border: 1px solid ${({ theme }) => theme.grey05};

  ${media.sm} {
    max-width: 500px;
    background: ${({ theme }) => theme.black03};
    border: none;
    padding: 0;
    margin-bottom: 24px;
  }
`;

export const LabelContainer = styled.div`
  font-size: 1.25rem;
  line-height: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  float: left;
  margin-bottom: 16px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  height: "44px",
  width: "100%",
  fontSize: "0.875rem",
  // border: `1px solid ${theme.palette.grey07}`,
  background: theme.palette.inputBGC,
  justifyContent: "center",
  borderRadius: "6px",

  "& fieldset": {
    border: "none",
  },

  "& input": {
    padding: "11.5px 20px",
  },

  [theme.breakpoints.up("sm")]: {
    border: `1px solid ${theme.palette.grey07}`,
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
  border: "none",
  borderRadius: "6px",
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
  color: theme.palette.black,
  background: theme.palette.primary.main,
  boxShadow: "none",
  border: "none",

  "&:hover": {
    color: theme.palette.black,
    background: theme.palette.primary.main,
  },

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
`;
