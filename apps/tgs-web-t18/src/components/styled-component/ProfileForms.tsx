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
  color: ${({ theme }) => theme.gray80};
  margin-bottom: 32px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  ${media.sm} {
    max-width: 500px;
  }
`;

export const LabelContainer = styled.div`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
  float: left;
  margin-bottom: 16px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
  justifyContent: "center",
  background: theme.palette.gray10,
  borderRadius: "6px",

  "& fieldset": {
    border: "none",
  },

  "& input": {
    padding: "15px 25px",
  },
})) as typeof MuiFormControl;

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.gray80};

  display: flex;
  align-items: center;
`;

export const UploadFileButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "0.875rem",
  height: "50px",
  color: theme.palette.black,
  border: "none",
  borderRadius: "6px",
  // border: `1px solid ${theme.palette.gray10}`,
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.text};

  display: flex;
  align-items: center;
`;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "46px",
  whiteSpace: "nowrap",
  padding: "11.5px",
  fontSize: "1.25rem",
  lineHeight: 1,
  fontWeight: 400,
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
