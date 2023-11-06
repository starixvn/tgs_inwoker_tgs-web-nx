import styled from "styled-components";
import { Button as MuiButton, FormControl as MuiFormControl } from "@mui/material";
import { styled as muiStyled } from "@mui/system";

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

  width: "100%",
  fontSize: "0.875rem",
  "& fieldset": {
    border: "none",
  },

  // [theme.breakpoints.up("sm")]: {
  //   border: `1px solid ${theme.palette.white}`,
  // },
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
  borderRadius: "6px",
  color: "#828282",
  background: theme.palette.gray95,
  border: "none",
})) as typeof MuiButton;

export const SubmitButton = muiStyled(MuiButton)(({ theme }) => ({
  fontSize: "0.937rem",
  height: "50px",
  whiteSpace: "nowrap",
  borderRadius: "6px",
  padding: "13px",
  fontWeight: 400,
  color: theme.palette.white,
  background: theme.palette.primary.main,

  "&:disabled": {
    background: theme.palette.gray90,
    color: theme.palette.gray40,
  },
})) as typeof MuiButton;
