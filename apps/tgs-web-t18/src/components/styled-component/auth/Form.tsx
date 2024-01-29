import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { FormControl as MuiFormControl } from "@mui/material";
import { media } from "@/theme/breakpoints";

export const TitleContainer = styled.div`
  font-size: 2.5rem;
  line-height: 3.5rem;
  font-weight: 700;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 41px;
  white-space: nowrap;

  & > .bottom-border {
    width: 68px;
    height: 5px;
    background: #6152dd;
  }

  ${media.sm} {
    display: none;
  }
`;

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
  color: #6152dd;
  font-size: 0.937rem;
  cursor: pointer;
  //margin: 8px 0;
`;
export const ForgotPasswordContainer = styled.span`
  color: #5d50e0;
  font-size: 0.937rem;
  font-weight: 400;
  line-height: 1.245;
  white-space: nowrap;
  cursor: pointer;
`;
export const RedirectContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 0.937rem;
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
