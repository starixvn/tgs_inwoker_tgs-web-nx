import styled from "styled-components";
import { Button as MuiButton, FormControl as MuiFormControl } from "@mui/material";
import { styled as muiStyled } from "@mui/system";
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
  background: theme.palette.mainLightBackground.main,

  width: "100%",
  fontSize: "0.937rem",
  "& fieldset": {
    border: "none",
  },

  [theme.breakpoints.up("sm")]: {
    border: `1px solid ${theme.palette.tertiary.main}`,
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
  background: theme.palette.mainLightBackground.main,
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
  borderRadius: "30px",
  padding: "12px 20px",
  fontSize: "1.562rem",
  lineHeight: "1.812rem",
  fontWeight: 400,
  color: "black",
  background: "linear-gradient(90deg, #FACE27 53.76%, #F3AF16 54.17%)",

  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    color: "black",
  },
})) as typeof MuiButton;
