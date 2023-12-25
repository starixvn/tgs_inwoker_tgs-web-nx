import styled from "styled-components";
import {
  Button as MuiButton,
  FormControl as MuiFormControl,
  styled as muiStyled,
} from "@mui/material";
import { media } from "@/theme/breakpoints";
import { Button } from "@/components/UI/Button";

export const Remark = styled.div`
  font-size: 0.937rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  margin-bottom: 24px;

  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
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
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.dae3};
  float: left;
  margin-bottom: 16px;

  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  background: theme.palette.white,
  justifyContent: "center",

  width: "100%",
  fontSize: "0.875rem",
  "& fieldset": {
    border: "none",
  },

  [theme.breakpoints.up("sm")]: {
    border: `1px solid ${theme.palette.blueBorder}`,
  },
})) as typeof MuiFormControl;

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};

  display: flex;
  align-items: center;
  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
`;

export const UploadFileButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "0.875rem",
  height: "50px",
  color: "#828282",
  border: "none",

  [theme.breakpoints.up("sm")]: {
    border: `1px solid ${theme.palette.blueBorder}`,
  },
})) as typeof MuiButton;

export const UploadFileTag = styled.span`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};

  display: flex;
  align-items: center;
  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
`;

export const SubmitButton = muiStyled(Button)(({ theme }) => ({
  border: "1px solid transparent ",
  "&:hover": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
})) as typeof MuiButton;

export const VerifySubmitButton = styled(SubmitButton)`
  margin-bottom: 20px !important;
  margin-top: auto !important;
`;
