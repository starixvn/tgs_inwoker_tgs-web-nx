import styled from "styled-components";
import {
  Button as MuiButton,
  FormControl as MuiFormControl,
  styled as muiStyled,
} from "@mui/material";
import { media } from "@/theme/breakpoints";

export const Remark = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.maskBlack50};
  margin-bottom: 24px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  ${media.sm} {
    max-width: 450px;
  }
`;

export const LabelContainer = styled.div`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
  float: left;
  margin-bottom: 16px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  borderRadius: "2px",
  background: theme.palette.white,
  border: `1px solid ${theme.palette.grey02}`,
  justifyContent: "center",

  width: "100%",
  fontSize: "0.875rem",
  "& fieldset": {
    border: "none",
  },
})) as typeof MuiFormControl;

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.maskBlack50};

  display: flex;
  align-items: center;
`;

export const UploadFileButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "0.875rem",
  height: "44px",
  borderRadius: "2px",
  color: "#828282",
  background: theme.palette.mainBackground,
  "&:hover": {
    color: theme.palette.white,
    background: theme.palette.secondary.main,
  },
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.maskBlack50};

  display: flex;
  align-items: center;
`;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  height: "44px",
  whiteSpace: "nowrap",
  borderRadius: "4px",
  padding: "14px",
  fontSize: "0.875rem",
  lineHeight: "1rem",
  fontWeight: 700,
  color: theme.palette.white,
  background: theme.palette.secondary.main,

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.white,
  },

  "&:hover": {
    background: "none",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
  margin-top: auto !important;
`;
