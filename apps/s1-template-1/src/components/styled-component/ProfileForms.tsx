import { media } from "@/theme/breakpoints";
import { Button as MuiButton, FormControl as MuiFormControl, styled as muiStyled } from "@mui/material";
import styled from "styled-components";

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
  color: ${({ theme }) => theme.text};
  float: left;
  margin-bottom: 16px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
  // borderBottom: `1px solid ${theme.palette.gray10}`,
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
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  position: relative;
  padding-top: 1rem;
`;

export const UploadFileButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "0.875rem",
  height: "50px",
  color: "#828282",
  // background: theme.palette.mainBackground,
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
  height: "4.8rem",
  whiteSpace: "nowrap",
  padding: "1.6rem",
  marginBottom: "2.4rem",
  fontSize: "1.4rem",
  lineHeight: 1,
  fontWeight: 700,
  color: theme.palette.submitButton.color,
  background: theme.palette.submitButton.background,
  boxShadow: theme.palette.submitButton.shadow,
  borderRadius: "1rem",

  "&:hover": {
    background: theme.palette.submitButton.background,
  },

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
`;
