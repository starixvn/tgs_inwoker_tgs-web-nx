import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { FormControl as MuiFormControl } from "@mui/material";

export const FormSubContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const RememberMeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.gray80};
  font-size: 0.875rem;
  cursor: pointer;
  //margin: 8px 0;
`;
export const ForgotPasswordContainer = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
`;
export const RedirectContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.gray80};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  align-items: center;

  .link {
    color: ${({ theme }) => theme.primary};
    margin-left: 8px;
    cursor: pointer;
    font-weight: 700;
  }
`;

export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
  justifyContent: "center",
  background: theme.palette.white,
  borderRadius: "6px",

  "& fieldset": {
    border: "none",
  },

  "& input": {
    padding: "15px 25px",
  },
})) as typeof MuiFormControl;
