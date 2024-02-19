import styled from "styled-components";
import {
  Button as MuiButton,
  FormControl as MuiFormControl,
  styled as muiStyled,
} from "@mui/material";
import { Button } from "@/components/UI/Button";

export const Remark = styled.div`
  font-size: 0.937rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  margin-bottom: 20px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const LabelContainer = styled.div`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  float: left;
  margin-bottom: 19px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  borderRadius: "5px",
  border: `1px solid ${theme.palette.tertiary.main}`,
  background: theme.palette.primaryDark,

  [theme.breakpoints.up("sm")]: {
    background: theme.palette.primaryLight,
  },

  width: "100%",
  "& fieldset": {
    border: "none",
  },
  "& input": {
    fontSize: "0.937rem !important",
  },
  "& input:placeholder": {
    fontSize: "0.937rem !important",
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
  color: theme.palette.white,
  border: `1px solid ${theme.palette.tertiary.main} !important`,
  borderRadius: "6px",
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};

  display: flex;
  align-items: center;
`;

export const SubmitButton = muiStyled(Button)(({ theme }) => ({
  fontSize: "1.25rem !important",
  borderRadius: "12px",
}));

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
`;
