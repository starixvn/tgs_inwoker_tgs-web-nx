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
  color: ${({ theme }) => theme.white};
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
  color: ${({ theme }) => theme.white};
  float: left;
  margin-bottom: 16px;
`;
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  borderRadius: "30px",
  background: theme.palette.mainLightBackground,

  width: "100%",
  fontSize: "0.937rem",
  "& fieldset": {
    border: "none",
  },

  [theme.breakpoints.up("sm")]: {
    border: `1px solid ${theme.palette.tertiary}`,
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
  fontSize: "0.937rem",
  height: "50px",
  borderRadius: "30px",
  color: "#828282",
  background: theme.palette.mainLightBackground,
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
  height: "50px",
  whiteSpace: "nowrap",
  padding: "10px 12px",
  color: theme.palette.white,
  background: theme.palette.primaryGradient ,
  fontFamily: "SF Pro",
  fontSize: "16px",
  fontWeight: 590,
  lineHeight: "19.09px",
  letterSpacing: "0em",
  textAlign: "center",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.white60,
  },
})) as typeof MuiButton;
