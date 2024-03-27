import styled from "styled-components";
import {
  Button as MuiButton,
  FormControl as MuiFormControl,
  styled as muiStyled,
} from "@mui/material";

export const Remark = styled.div`
  font-size: 0.937rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  margin-bottom: 24px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const LabelContainer = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  float: left;
  margin-bottom: 16px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  borderRadius: "5px",
  background: theme.palette.gray95,
  maxWidth: "500px",
  height: "48px",
  width: "100%",
  fontSize: "0.875rem",
  justifyContent: "center",

  "& fieldset": {
    border: "none",
  },

  [theme.breakpoints.up("sm")]: {
    background: theme.palette.mainBackground,
  },

  "& input": {
    // background: theme.palette.mainBackground,
  },
})) as typeof MuiFormControl;

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};

  display: flex;
  align-items: center;
`;

export const UploadFileButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "0.875rem",
  height: "50px",
  borderRadius: "6px",
  color: theme.palette.gray10,
  background: theme.palette.mainBackground,
  border: "none",
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};

  display: flex;
  align-items: center;
`;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "1.25rem",
  lineHeight: "24.2px",
  height: "53px",
  whiteSpace: "nowrap",
  borderRadius: "4px",
  padding: "11px",
  fontWeight: 700,
  color: theme.palette.white,
  background: theme.palette.primary.main,

  "&:disabled": {
    background: theme.palette.gray90,
    color: theme.palette.gray40,
  },

  "&:hover": {
    background: theme.palette.primary.main,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
  margin-top: auto !important;
`;
